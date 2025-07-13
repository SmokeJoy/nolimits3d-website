import React, { useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect, Suspense } from 'react';
import { Canvas, useLoader, useThree, invalidate } from '@react-three/fiber';
import { OrbitControls, Bounds } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { CloudArrowUpIcon, EyeIcon, CubeIcon, ScaleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import ErrorBoundary from './ErrorBoundary';
import { autoOrientSTL, type OrientationResult } from '../utils/stlAutoOrientation';
import { dropMeshOnBed } from '../utils/dropMeshOnBed';

// Utility function per formattare il peso in modo consistente
const formatWeight = (volume: number, density: number): string => {
  const weight = volume * density;
  if (weight < 0.1) {
    return '<0.1 g';
  } else if (weight < 1) {
    return `${weight.toFixed(1)} g`;
  } else {
    return `${Math.round(weight)} g`;
  }
};

interface STLUploadProps {
  onVolumeCalculated: (volume: number, weight: number, supportArea?: number) => void;
  selectedMaterial: {
    name: string;
    density: number; // g/cm³
  };
}

// Funzione per calcolare il volume di una mesh STL
const calculateMeshVolume = (geometry: THREE.BufferGeometry): number => {
  try {
    // Controlli di sicurezza più robusti
    if (!geometry || !geometry.attributes || !geometry.attributes.position) {
      console.warn('Geometria non valida o posizione mancante');
      return 0;
    }

    const position = geometry.attributes.position;
    if (!position || !position.count || position.count === 0) {
      console.warn('Attributi posizione non validi');
      return 0;
    }

    // Verifica che il numero di vertici sia divisibile per 3 (triangoli)
    if (position.count % 3 !== 0) {
      console.warn('Numero di vertici non divisibile per 3');
      return 0;
    }

    let volume = 0;
    
    // Calcolo volume usando metodo del tetraedro firmato
    for (let i = 0; i < position.count; i += 3) {
      try {
        const a = new THREE.Vector3().fromBufferAttribute(position, i);
        const b = new THREE.Vector3().fromBufferAttribute(position, i + 1);
        const c = new THREE.Vector3().fromBufferAttribute(position, i + 2);
        
        // Controllo che i vertici siano validi
        if (!a || !b || !c || isNaN(a.x) || isNaN(b.x) || isNaN(c.x)) {
          continue;
        }
        
        // Volume firmato del tetraedro formato dal triangolo e l'origine
        const signedVolume = a.dot(
          new THREE.Vector3().crossVectors(b, c)
        ) / 6;
        
        // Controllo che il volume calcolato sia valido
        if (!isNaN(signedVolume) && isFinite(signedVolume)) {
          volume += signedVolume;
        }
      } catch (triangleError) {
        console.warn('Errore elaborazione triangolo:', triangleError);
        continue;
      }
    }
    
    // Prendi il valore assoluto e converti da mm³ a cm³
    const volumeCm3 = Math.abs(volume) / 1000;
    
    // Sanity check: volume ragionevole per oggetti 3D (0.1 - 10000 cm³)
    if (isNaN(volumeCm3) || !isFinite(volumeCm3)) {
      console.warn('Volume calcolato non valido:', volumeCm3);
      return 10; // Valore di fallback
    }
    
    return Math.max(0.1, Math.min(volumeCm3, 10000));
    
  } catch (error) {
    console.error('Error calculating volume:', error);
    return 10; // Valore di fallback più alto
  }
};

import type { OrbitControls as DreiOrbitControls } from '@react-three/drei'; // type-only

// ...

function STLViewer({ stlArrayBuffer, onVolumeChange, onOrientationChange, refreshTrigger, controlsRef }: { 
  stlArrayBuffer: ArrayBuffer; 
  onVolumeChange: (vol: number) => void;
  onOrientationChange?: (result: OrientationResult | null) => void;
  refreshTrigger?: number;
  controlsRef: React.RefObject<DreiOrbitControls | null>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prevVolumeRef = useRef(0); // Traccia volume precedente per evitare loop
  const orientationProcessed = useRef(false); // Flag per evitare auto-orientamento multiplo
  const orientationRan = useRef(false); // Nuovo ref per bloccare doppi avvii in Strict Mode
  const controls = useThree(s => s.controls);

  // Carica la geometria dall'ArrayBuffer
  const geometry = useMemo(() => {
    try {
      const loader = new STLLoader();
      return loader.parse(stlArrayBuffer);
    } catch (error) {
      console.error("Error parsing STL ArrayBuffer:", error);
      return new THREE.BufferGeometry(); // Return an empty geometry on error
    }
  }, [stlArrayBuffer]);

  // Gestione del listener passivo per OrbitControls
  useEffect(() => {
    const controls = controlsRef.current;
    const el = controls?.domElement;
    if (!controls || !el) return; // wait until OrbitControls is ready

    // one stable callback for add & remove
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault(); // optional behaviour
      (controls as any).handleMouseWheel?.(e); // still call original
    };

    // passive listener to silence Chrome
    el.addEventListener('wheel', handleWheel, { passive: true });

    return () => el.removeEventListener('wheel', handleWheel); // cleanup
  }, [controlsRef]); // ← depend on the ref object only

  // 🔄 Forza il primo render dopo il caricamento della geometria
  useEffect(() => {
    invalidate();        // forza il primo render
  }, [geometry]);

  // 🔄 Reset dell'orientamento quando cambia il refreshTrigger
  useEffect(() => {
    if (refreshTrigger !== undefined) {
      orientationProcessed.current = false;
      orientationRan.current = false; // Reset anche questo flag
    }
  }, [refreshTrigger]);

  // 🔄 Auto-orientamento asincrono
  useEffect(() => {
    if (!geometry || orientationProcessed.current || orientationRan.current) return; // Aggiungi la guardia
    
    orientationRan.current = true; // Imposta il flag per bloccare avvii futuri

    const performAutoOrientation = async () => {
      try {
        console.log('🔄 Avvio auto-orientamento STL...');
        const worker = new Worker(new URL('../workers/orientWorker.ts', import.meta.url), { type: 'module' });
        
        // Passa l'ArrayBuffer al worker
        worker.postMessage({ geometry: geometry.toJSON(), weights: { support: 0.4, time: 0.2, stability: 0.4 } });

        worker.onmessage = (e) => {
          const orientationResult = e.data;
          console.log('✅ Auto-orientamento completato:', orientationResult.metrics);
          
          if (onOrientationChange) {
            onOrientationChange(orientationResult);
          }
          
          if (meshRef.current && orientationResult.rotation) {
            const mesh = meshRef.current;
            mesh.position.set(0, 0, 0);
            mesh.rotation.copy(orientationResult.rotation);
            mesh.updateMatrixWorld(true);
            dropMeshOnBed(mesh);
            const box = new THREE.Box3().setFromObject(mesh);
            const size = box.getSize(new THREE.Vector3());
            if (controls && 'target' in controls && 'update' in controls) {
              const c = controls as { target: THREE.Vector3; update: () => void };
              c.target.set(0, size.y / 2, 0);
              c.update();
            }
            invalidate();
          }
          orientationProcessed.current = true;
          worker.terminate();
        };

        worker.onerror = (error) => {
          console.error('❌ Errore Web Worker auto-orientamento:', error);
          if (onOrientationChange) {
            onOrientationChange(null);
          }
          orientationProcessed.current = true;
          worker.terminate();
        };
        
      } catch (error) {
        console.error('❌ Errore auto-orientamento:', error);
        if (onOrientationChange) {
          onOrientationChange(null);
        }
        orientationProcessed.current = true;
      }
    };
    
    performAutoOrientation();
  }, [geometry, onOrientationChange, stlArrayBuffer]); // Aggiunto stlArrayBuffer come dipendenza

  // Gestione WebGL context lost
  useEffect(() => {
    const canvas = controlsRef.current?.domElement; // Accedi al canvas tramite controlsRef
    if (!canvas) return;

    const handleContextLost = (e: WebGLContextEvent) => {
      e.preventDefault();
      console.warn('⚠️ WebGL context lost – provo a ripristinare');
      try { 
        // three.js gestisce il ripristino del contesto, ma possiamo forzarlo se necessario
        // controlsRef.current?.context.restore(); // Questa riga non è corretta per three.js
      } catch (err) {
        console.error('Errore durante il ripristino del contesto WebGL:', err);
      }
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
    };
  }, [controlsRef]);

  // 1️⃣ ricavo una copia centrata sul pivot X-Z (geometry "nuda")
  const centeredGeometry = useMemo(() => {
    try {
      // Controlli di sicurezza per la geometria
      if (!geometry || !geometry.attributes || !geometry.attributes.position) {
        console.warn('Geometria non valida per il centramento');
        return geometry; // Ritorna la geometria originale se non valida
      }

      const g = geometry.clone();
      g.computeBoundingBox();
      
      // Controllo che la bounding box sia valida
      if (!g.boundingBox || !g.boundingBox.max || !g.boundingBox.min) {
        console.warn('Bounding box non valida');
        return g; // Ritorna la geometria clonata senza traslazione
      }

      const b = g.boundingBox;
      g.translate(-(b.max.x + b.min.x) / 2, 0, -(b.max.z + b.min.z) / 2);
      
      // Reset flag quando cambia geometry (nuovo STL)
      orientationProcessed.current = false; // Reset anche flag orientamento
      
      return g;
    } catch (error) {
      console.error('Errore durante il centramento della geometria:', error);
      // Reset flag in caso di errore
      orientationProcessed.current = false;
      return geometry; // Ritorna la geometria originale in caso di errore
    }
  }, [geometry]);

  useLayoutEffect(() => {
    if (!meshRef.current) return;

    try {
      // Controlli di sicurezza per la geometria centrata
      if (!centeredGeometry || !centeredGeometry.attributes || !centeredGeometry.attributes.position) {
        console.warn('Geometria centrata non valida');
        onVolumeChange(10); // Valore di fallback
        return;
      }

      /* A. misura SOLO sulla geometria NON scalata */
      centeredGeometry.computeBoundingBox();
      
      // Controllo che la bounding box sia valida
      if (!centeredGeometry.boundingBox || !centeredGeometry.boundingBox.max || !centeredGeometry.boundingBox.min) {
        console.warn('Bounding box non valida durante il processing');
        onVolumeChange(10); // Valore di fallback
        return;
      }

      const size = centeredGeometry.boundingBox.getSize(new THREE.Vector3());
      
      // Controllo che le dimensioni siano valide
      if (isNaN(size.x) || isNaN(size.y) || isNaN(size.z) || size.x <= 0 || size.y <= 0 || size.z <= 0) {
        console.warn('Dimensioni geometria non valide:', size);
        onVolumeChange(10); // Valore di fallback
        return;
      }

      const maxDim = Math.max(size.x, size.y, size.z);

      /* B. calcola scale una sola volta */
      const scale = Math.min(8 / maxDim, 5); // Permette scale > 1 per oggetti piccoli
      
      // Controllo che la scala sia valida
      if (isNaN(scale) || !isFinite(scale) || scale <= 0) {
        console.warn('Scala non valida:', scale);
        onVolumeChange(10); // Valore di fallback
        return;
      }

      /* C. scala */
      meshRef.current.scale.setScalar(scale);

      /* D. appoggia sul bed */
      dropMeshOnBed(meshRef.current);

      /* E. centra il target dei controlli */
      const box = new THREE.Box3().setFromObject(meshRef.current);
      const boxSize = box.getSize(new THREE.Vector3());
      if (controls && 'target' in controls && 'update' in controls) {
        try {
          const controlsTyped = controls as { target: THREE.Vector3; update: () => void };
          if (boxSize && !isNaN(boxSize.y)) {
            controlsTyped.target.set(0, boxSize.y / 2, 0);
            controlsTyped.update();
          }
        } catch (controlsError) {
          console.warn('Errore aggiornamento controlli:', controlsError);
        }
      }

      /* F. volume corretto */
      const vol = calculateMeshVolume(centeredGeometry) * Math.pow(scale, 3);
      
      // Controllo che il volume sia valido
      if (isNaN(vol) || !isFinite(vol) || vol <= 0) {
        console.warn('Volume calcolato non valido:', vol);
        onVolumeChange(10); // Valore di fallback
        return;
      }

      if (Math.abs(vol - prevVolumeRef.current) > 0.01) { // Soglia 0.01 cm³
        prevVolumeRef.current = vol;
        onVolumeChange(vol);
      }
      
    } catch (error) {
      console.error('Error processing geometry:', error);
      // Fallback volume se il calcolo fallisce
      onVolumeChange(10);
    }
  }, [centeredGeometry, onVolumeChange, controls]);

  return (
    <mesh ref={meshRef} geometry={centeredGeometry}>
      <meshStandardMaterial 
        color="#4f46e5" 
        metalness={0.1} 
        roughness={0.25}
        transparent={true}
        opacity={0.9}
      />
    </mesh>
  );
}

const STLUpload: React.FC<STLUploadProps> = ({ onVolumeCalculated, selectedMaterial }) => {
  const [file, setFile] = useState<File | null>(null);
  const [stlArrayBuffer, setStlArrayBuffer] = useState<ArrayBuffer | null>(null); // Nuovo stato per ArrayBuffer
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [isAutoOrienting, setIsAutoOrienting] = useState(false);
  const [orientationResult, setOrientationResult] = useState<OrientationResult | null>(null);
  const [orientationRefresh, setOrientationRefresh] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null); // Dichiarazione del ref qui

  const handleVolumeChange = useCallback((calculatedVolume: number) => {
    setVolume(calculatedVolume);
    const weight = calculatedVolume * selectedMaterial.density;
    const supportArea = orientationResult?.metrics.supportArea || 0;
    onVolumeCalculated(calculatedVolume, weight, supportArea);
  }, [selectedMaterial.density, onVolumeCalculated, orientationResult]);

  const handleOrientationChange = useCallback((result: OrientationResult | null) => {
    setOrientationResult(result);
    setIsAutoOrienting(false);
    
    // Ricalcola il volume con il nuovo orientamento se necessario
    if (volume > 0 && result) {
      const weight = volume * selectedMaterial.density;
      onVolumeCalculated(volume, weight, result.metrics.supportArea);
    }
  }, [volume, selectedMaterial.density, onVolumeCalculated]);

  const startAutoOrientation = useCallback(() => {
    setIsAutoOrienting(true);
    setOrientationResult(null);
    // 🔑 Forza il re-run dell'algoritmo incrementando il counter
    setOrientationRefresh(prev => prev + 1);
    // 🔄 Forza il ridisegno del canvas
    invalidate();
  }, []);

  // Cleanup ArrayBuffer quando il componente viene smontato o file cambia
  useEffect(() => {
    return () => {
      // Non è necessario revocare URL.createObjectURL per ArrayBuffer
    };
  }, []); // Dipendenza vuota, cleanup solo allo smontaggio

  const handleFileUpload = useCallback(async (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith('.stl')) {
      setError('Solo file STL sono supportati');
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
      setError('File troppo grande. Massimo 50MB');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      setStlArrayBuffer(arrayBuffer);
      setFile(selectedFile);
    } catch (e) {
      console.error("Error reading file as ArrayBuffer:", e);
      setError('Errore durante il caricamento del file');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileUpload(droppedFile);
    }
  }, [handleFileUpload]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  }, [handleFileUpload]);

  const resetUpload = () => {
    setFile(null);
    setStlArrayBuffer(null);
    setVolume(0);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {!file ? (
        // Upload Area
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-700/50"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".stl"
            onChange={handleInputChange}
            className="hidden"
          />
          
          <CloudArrowUpIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-white">
              Carica il tuo file STL
            </h3>
            <p className="text-sm text-gray-300">
              Trascina il file qui o clicca per selezionare
            </p>
            <p className="text-xs text-gray-400">
              Supportati: file STL fino a 50MB
            </p>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-600 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>
      ) : (
        // Preview Area
        <div className="space-y-4">
          {/* File Info */}
          <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600">
            <div className="flex items-center space-x-3">
              <CubeIcon className="h-6 w-6 text-blue-400" />
              <div>
                <div className="font-medium text-white">{file.name}</div>
                <div className="text-sm text-gray-400">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </div>
              </div>
            </div>
            <button
              onClick={resetUpload}
              className="text-sm text-red-400 hover:text-red-300 underline"
            >
              Rimuovi
            </button>
          </div>

          {/* 3D Preview */}
          <div className="bg-slate-800 rounded-lg border border-slate-600 overflow-hidden">
            <div className="p-4 border-b border-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <EyeIcon className="h-5 w-5 text-blue-400" />
                  <h4 className="font-medium text-white">Anteprima 3D</h4>
                </div>
                {isAutoOrienting && (
                  <div className="flex items-center space-x-2 text-xs text-blue-400">
                    <ArrowPathIcon className="h-4 w-4 animate-spin" />
                    <span>Auto-orientamento...</span>
                  </div>
                )}
                {orientationResult && !isAutoOrienting && (
                  <div className="flex items-center space-x-2 text-xs text-green-400">
                    <span>✅ Orientamento ottimizzato</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="h-80 bg-gradient-to-b from-slate-900 to-slate-800">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-sm text-gray-300">Caricamento modello 3D...</p>
                  </div>
                </div>
              ) : stlArrayBuffer ? (
                <ErrorBoundary>
                  <Suspense fallback={
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-sm text-gray-300">Preparazione Vista 3D...</p>
                      </div>
                    </div>
                  }>
                    <Canvas
                      shadows
                      frameloop="demand"
                      camera={{ position: [10, 10, 10], fov: 35 }}
                    >
                      <ambientLight intensity={0.6} />
                      <directionalLight position={[10, 10, 5]} intensity={0.8} />
                      <pointLight position={[-10, -10, -10]} intensity={0.3} />
                      
                      <Bounds fit observe margin={1}>
                        <STLViewer 
                          stlArrayBuffer={stlArrayBuffer} 
                          onVolumeChange={handleVolumeChange}
                          onOrientationChange={handleOrientationChange}
                          refreshTrigger={orientationRefresh}
                          controlsRef={controlsRef}          // NEW
                        />
                      </Bounds>
                      
                      <OrbitControls 
                        ref={controlsRef} // Aggiungi un ref per accedere all'istanza
                        makeDefault
                        enablePan={true}
                        enableZoom={false} // Disattiva lo zoom con la rotella del mouse
                        enableRotate={true}
                        minDistance={5}
                        maxDistance={50}
                        onChange={() => invalidate()}
                      />
                      
                      {/* Grid helper */}
                      <gridHelper args={[20, 20]} />
                    </Canvas>
                  </Suspense>
                </ErrorBoundary>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <CubeIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-gray-300">File caricato, preparazione vista 3D...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Calculated Data */}
          {volume > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <CubeIcon className="h-5 w-5 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">Volume</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {volume.toFixed(2)} cm³
                  </div>
                </div>
                
                <div className="p-4 bg-green-900/30 rounded-lg border border-green-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <ScaleIcon className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-medium text-green-300">Peso</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {formatWeight(volume, selectedMaterial.density)}
                  </div>
                </div>
                
                <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-purple-300">Materiale</span>
                  </div>
                  <div className="text-lg font-bold text-white">
                    {selectedMaterial.name}
                  </div>
                  <div className="text-xs text-purple-300">
                    {selectedMaterial.density} g/cm³
                  </div>
                </div>
              </div>

              {/* Auto-Orientation Metrics */}
              {orientationResult && (
                <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-white flex items-center">
                      🎯 Ottimizzazione Orientamento
                    </h5>
                    <button
                      onClick={startAutoOrientation}
                      disabled={isAutoOrienting}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1 disabled:opacity-50"
                    >
                      <ArrowPathIcon className={`h-3 w-3 ${isAutoOrienting ? 'animate-spin' : ''}`} />
                      <span>Ricalcola</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="text-center">
                      <div className="text-orange-400 font-medium">
                        {orientationResult.metrics.supportArea.toFixed(1)} cm²
                      </div>
                      <div className="text-gray-400">Supporti</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-medium">
                        {orientationResult.metrics.printHeight.toFixed(1)} mm
                      </div>
                      <div className="text-gray-400">Altezza</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 font-medium">
                        {(orientationResult.metrics.baseStability * 100).toFixed(0)}%
                      </div>
                      <div className="text-gray-400">Stabilità</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pro Tips */}
          <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <h5 className="font-medium text-white mb-2">💡 Suggerimenti</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Usa il mouse per ruotare, zoom e pan del modello</li>
              <li>• Il volume viene calcolato automaticamente dalla mesh</li>
              <li>• Il peso dipende dal materiale selezionato</li>
              <li>• Per modelli complessi, il calcolo potrebbe richiedere alcuni secondi</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default STLUpload; 