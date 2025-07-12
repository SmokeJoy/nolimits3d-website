import React, { useState, useRef, useCallback, useEffect, useMemo, useLayoutEffect, Suspense } from 'react';
import { Canvas, useLoader, useThree, invalidate } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { CloudArrowUpIcon, EyeIcon, CubeIcon, ScaleIcon } from '@heroicons/react/24/outline';
import ErrorBoundary from './ErrorBoundary';

interface STLUploadProps {
  onVolumeCalculated: (volume: number, weight: number) => void;
  selectedMaterial: {
    name: string;
    density: number; // g/cm³
  };
}

// Funzione per calcolare il volume di una mesh STL
const calculateMeshVolume = (geometry: THREE.BufferGeometry): number => {
  try {
    const position = geometry.attributes.position;
    if (!position || position.count === 0) return 0;

    let volume = 0;
    
    // Calcolo volume usando metodo del tetraedro firmato
    for (let i = 0; i < position.count; i += 3) {
      const a = new THREE.Vector3().fromBufferAttribute(position, i);
      const b = new THREE.Vector3().fromBufferAttribute(position, i + 1);
      const c = new THREE.Vector3().fromBufferAttribute(position, i + 2);
      
      // Volume firmato del tetraedro formato dal triangolo e l'origine
      const signedVolume = a.dot(
        new THREE.Vector3().crossVectors(b, c)
      ) / 6;
      
      volume += signedVolume;
    }
    
    // Prendi il valore assoluto e converti da mm³ a cm³
    const volumeCm3 = Math.abs(volume) / 1000;
    
    // Sanity check: volume ragionevole per oggetti 3D (0.1 - 10000 cm³)
    return Math.max(0.1, Math.min(volumeCm3, 10000));
    
  } catch (error) {
    console.error('Error calculating volume:', error);
    return 0;
  }
};

function STLViewer({ url, onVolumeChange }: { url: string; onVolumeChange: (vol: number) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const prevVolumeRef = useRef(0); // Traccia volume precedente per evitare loop
  const scaledRef = useRef(false); // 🔹 nuovo flag per evitare loop di scala
  const controls = useThree(s => s.controls);
  const geometry = useLoader(STLLoader, url);

  // 1️⃣ ricavo una copia centrata sul pivot X-Z (geometry "nuda")
  const centeredGeometry = useMemo(() => {
    const g = geometry.clone();
    g.computeBoundingBox();
    const b = g.boundingBox!;
    g.translate(-(b.max.x + b.min.x) / 2, 0, -(b.max.z + b.min.z) / 2);
    
    // Reset flag quando cambia geometry (nuovo STL)
    scaledRef.current = false;
    
    return g;
  }, [geometry]);

  useLayoutEffect(() => {
    if (!meshRef.current || scaledRef.current) return;

    try {
      /* A. misura SOLO sulla geometria NON scalata */
      centeredGeometry.computeBoundingBox();
      const size = centeredGeometry.boundingBox!.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      /* B. calcola scale una sola volta */
      const scale = Math.max(0.2, Math.min(8 / maxDim, 1));
      meshRef.current.scale.setScalar(scale);

      /* C. posa sul piano */
      const box = new THREE.Box3().setFromObject(meshRef.current);
      meshRef.current.position.y -= box.min.y;

      /* D. CENTER TARGET CONTROLLI */
      if (controls && 'target' in controls && 'update' in controls) {
        const controlsTyped = controls as { target: THREE.Vector3; update: () => void };
        controlsTyped.target.set(0, box.getSize(new THREE.Vector3()).y / 2, 0);
        controlsTyped.update();
      }

      /* E. volume corretto */
      const vol = calculateMeshVolume(centeredGeometry) * Math.pow(scale, 3);
      if (Math.abs(vol - prevVolumeRef.current) > 0.01) { // Soglia 0.01 cm³
        prevVolumeRef.current = vol;
        onVolumeChange(vol);
      }

      scaledRef.current = true; // 🔹 blocca future esecuzioni
      
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
  const [fileUrl, setFileUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVolumeChange = useCallback((calculatedVolume: number) => {
    setVolume(calculatedVolume);
    const weight = calculatedVolume * selectedMaterial.density;
    onVolumeCalculated(calculatedVolume, weight);
  }, [selectedMaterial.density, onVolumeCalculated]);

  // Cleanup URL object quando il componente viene smontato
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

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
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
      setFile(selectedFile);
    } catch {
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
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    setFile(null);
    setFileUrl('');
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
              <div className="flex items-center space-x-2">
                <EyeIcon className="h-5 w-5 text-blue-400" />
                <h4 className="font-medium text-white">Anteprima 3D</h4>
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
              ) : fileUrl ? (
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
                      
                      <STLViewer url={fileUrl} onVolumeChange={handleVolumeChange} />
                      
                      <OrbitControls 
                        makeDefault
                        enablePan={true}
                        enableZoom={true}
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
                  {(volume * selectedMaterial.density).toFixed(1)} g
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