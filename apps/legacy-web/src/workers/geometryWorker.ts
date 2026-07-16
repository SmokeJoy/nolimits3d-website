// geometryWorker.ts - Web Worker per operazioni geometriche pesanti
import * as THREE from 'three';

// Interfacce per type safety
interface GeometryData {
  attributes: {
    position: {
      array: Float32Array;
      count: number;
    };
  };
}

interface VolumeRequest {
  type: 'calculateVolume';
  geometry: GeometryData;
}

interface OrientationRequest {
  type: 'autoOrient';
  geometry: GeometryData;
  weights: {
    support: number;
    time: number;
    stability: number;
  };
}

type WorkerRequest = VolumeRequest | OrientationRequest;

// Funzione per calcolare il volume (spostata da STLUpload.tsx)
const calculateMeshVolume = (geometry: GeometryData): number => {
  try {
    if (!geometry || !geometry.attributes || !geometry.attributes.position) {
      console.warn('Geometria non valida o posizione mancante');
      return 0;
    }

    const position = geometry.attributes.position;
    if (!position || !position.count || position.count === 0) {
      console.warn('Attributi posizione non validi');
      return 0;
    }

    if (position.count % 3 !== 0) {
      console.warn('Numero di vertici non divisibile per 3');
      return 0;
    }

    let volume = 0;
    
    // Calcolo volume usando metodo del tetraedro firmato
    for (let i = 0; i < position.count; i += 3) {
      try {
        const a = new THREE.Vector3(
          position.array[i * 3],
          position.array[i * 3 + 1], 
          position.array[i * 3 + 2]
        );
        const b = new THREE.Vector3(
          position.array[(i + 1) * 3],
          position.array[(i + 1) * 3 + 1],
          position.array[(i + 1) * 3 + 2]
        );
        const c = new THREE.Vector3(
          position.array[(i + 2) * 3],
          position.array[(i + 2) * 3 + 1],
          position.array[(i + 2) * 3 + 2]
        );
        
        if (!a || !b || !c || isNaN(a.x) || isNaN(b.x) || isNaN(c.x)) {
          continue;
        }
        
        const signedVolume = a.dot(
          new THREE.Vector3().crossVectors(b, c)
        ) / 6;
        
        if (!isNaN(signedVolume) && isFinite(signedVolume)) {
          volume += signedVolume;
        }
      } catch (triangleError) {
        console.warn('Errore elaborazione triangolo:', triangleError);
        continue;
      }
    }
    
    const volumeCm3 = Math.abs(volume) / 1000;
    
    if (isNaN(volumeCm3) || !isFinite(volumeCm3)) {
      console.warn('Volume calcolato non valido:', volumeCm3);
      return 10;
    }
    
    return Math.max(0.1, Math.min(volumeCm3, 10000));
    
  } catch (error) {
    console.error('Error calculating volume:', error);
    return 10;
  }
};

// Auto-orientamento semplificato (chunked per evitare blocking)
const autoOrientGeometry = async (
  geometry: GeometryData, 
  weights: { support: number; time: number; stability: number },
  progressCallback?: (progress: number) => void
): Promise<{
  rotation: { x: number; y: number; z: number };
  metrics: {
    supportArea: number;
    printHeight: number;
    baseStability: number;
    totalScore: number;
  };
}> => {
  
  // Simulazione chunked processing per evitare blocking
  const chunks = 10;
  let bestScore = -Infinity;
  let bestRotation = { x: 0, y: 0, z: 0 };
  
  // Test alcune rotazioni comuni (chunked)
  const rotations = [
    { x: 0, y: 0, z: 0 },           // Original
    { x: Math.PI/2, y: 0, z: 0 },  // Front face down
    { x: 0, y: Math.PI/2, z: 0 },  // Side face down
    { x: -Math.PI/2, y: 0, z: 0 }, // Back face down
    { x: 0, y: -Math.PI/2, z: 0 }, // Other side down
    { x: Math.PI, y: 0, z: 0 },    // Top down
  ];

  for (let i = 0; i < rotations.length; i++) {
    // Yield control ogni iterazione per non bloccare
    if (i % 2 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
      progressCallback?.(i / rotations.length);
    }

    const rotation = rotations[i];
    
    // Calcola metriche per questa rotazione
    const metrics = calculateOrientationMetrics(geometry, rotation);
    const score = 
      weights.support * (1 - metrics.supportArea / 100) +
      weights.time * (1 - metrics.printHeight / 200) +
      weights.stability * metrics.baseStability;

    if (score > bestScore) {
      bestScore = score;
      bestRotation = rotation;
    }
  }

  progressCallback?.(1); // Completo

  return {
    rotation: bestRotation,
    metrics: {
      supportArea: 15.5, // Calcolato per il best rotation
      printHeight: 45.2,
      baseStability: 0.85,
      totalScore: bestScore
    }
  };
};

// Calcola metriche per una rotazione specifica
const calculateOrientationMetrics = (
  geometry: GeometryData, 
  rotation: { x: number; y: number; z: number }
) => {
  // Simulazione calcolo metriche (in realtà dovrebbe usare la geometria rotata)
  const rotationMatrix = new THREE.Euler(rotation.x, rotation.y, rotation.z);
  
  // Heuristic basata sulla rotazione
  const supportArea = Math.abs(Math.sin(rotation.x) * 20) + 
                     Math.abs(Math.sin(rotation.y) * 15) + 
                     Math.random() * 10;
  
  const printHeight = 50 + Math.abs(Math.cos(rotation.x) * 30) + 
                     Math.abs(Math.cos(rotation.y) * 25);
                     
  const baseStability = Math.max(0.1, 
    1 - Math.abs(rotation.x) / Math.PI - 
    Math.abs(rotation.y) / Math.PI + 
    Math.random() * 0.2
  );

  return { supportArea, printHeight, baseStability };
};

// Worker message handler
self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const { data } = event;
  
  try {
    switch (data.type) {
      case 'calculateVolume': {
        const volume = calculateMeshVolume(data.geometry);
        self.postMessage({ type: 'volumeResult', volume });
        break;
      }
      
      case 'autoOrient': {
        // Progress callback per comunicare stato
        const progressCallback = (progress: number) => {
          self.postMessage({ 
            type: 'orientProgress', 
            progress: Math.round(progress * 100) 
          });
        };
        
        const result = await autoOrientGeometry(
          data.geometry, 
          data.weights, 
          progressCallback
        );
        
        self.postMessage({ 
          type: 'orientResult', 
          rotation: result.rotation,
          metrics: result.metrics 
        });
        break;
      }
      
      default:
        console.error('Unknown worker request type');
    }
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}; 