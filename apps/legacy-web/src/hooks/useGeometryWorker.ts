// useGeometryWorker.ts - Custom hook per gestire il worker geometrico
import { useRef, useCallback, useEffect, useState } from 'react';
import * as THREE from 'three';
import type { OrientationResult } from '../utils/stlAutoOrientation';

interface GeometryData {
  attributes: {
    position: {
      array: Float32Array;
      count: number;
    };
  };
}

interface GeometryWorkerHook {
  calculateVolume: (geometry: GeometryData) => Promise<number>;
  autoOrient: (
    geometry: GeometryData, 
    weights: { support: number; time: number; stability: number },
    onProgress?: (progress: number) => void
  ) => Promise<OrientationResult>;
  isWorking: boolean;
  terminate: () => void;
}

export const useGeometryWorker = (): GeometryWorkerHook => {
  const workerRef = useRef<Worker | null>(null);
  const [isWorking, setIsWorking] = useState(false);
  const callbacksRef = useRef<Map<string, (data: any) => void>>(new Map());

  // Inizializza worker al primo utilizzo
  const initWorker = useCallback(() => {
    if (!workerRef.current) {
      try {
        workerRef.current = new Worker(
          new URL('../workers/geometryWorker.ts', import.meta.url),
          { type: 'module' }
        );
        
        // Handler per messaggi dal worker
        workerRef.current.onmessage = (event) => {
          const { data } = event;
          const callback = callbacksRef.current.get(data.type);
          
          if (callback) {
            callback(data);
          }
        };

        workerRef.current.onerror = (error) => {
          console.error('Geometry Worker Error:', error);
          setIsWorking(false);
        };
        
      } catch (error) {
        console.error('Failed to create geometry worker:', error);
      }
    }
    return workerRef.current;
  }, []);

  // Calcola volume in background
  const calculateVolume = useCallback(async (geometry: GeometryData): Promise<number> => {
    const worker = initWorker();
    if (!worker) {
      throw new Error('Worker not available');
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Volume calculation timeout'));
      }, 10000); // 10s timeout

             setIsWorking(true);

      // Set callback per risultato
      callbacksRef.current.set('volumeResult', (data) => {
        clearTimeout(timeout);
        setIsWorking(false);
        callbacksRef.current.delete('volumeResult');
        resolve(data.volume);
      });

      // Set callback per errori
      callbacksRef.current.set('error', (data) => {
        clearTimeout(timeout);
        setIsWorking(false);
        callbacksRef.current.delete('volumeResult');
        callbacksRef.current.delete('error');
        reject(new Error(data.message));
      });

      // Invia richiesta al worker
      worker.postMessage({
        type: 'calculateVolume',
        geometry: {
          attributes: {
            position: {
              array: geometry.attributes.position.array,
              count: geometry.attributes.position.count
            }
          }
        }
      });
    });
  }, [initWorker]);

  // Auto-orientamento in background con progress
  const autoOrient = useCallback(async (
    geometry: GeometryData,
    weights: { support: number; time: number; stability: number },
    onProgress?: (progress: number) => void
  ): Promise<OrientationResult> => {
    const worker = initWorker();
    if (!worker) {
      throw new Error('Worker not available');
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Auto-orientation timeout'));
      }, 30000); // 30s timeout

      setIsWorking(true);

      // Set callback per progress updates
      if (onProgress) {
        callbacksRef.current.set('orientProgress', (data) => {
          onProgress(data.progress);
        });
      }

      // Set callback per risultato finale
      callbacksRef.current.set('orientResult', (data) => {
        clearTimeout(timeout);
        setIsWorking(false);
        callbacksRef.current.delete('orientResult');
        callbacksRef.current.delete('orientProgress');
        callbacksRef.current.delete('error');
        
        // Converte in formato OrientationResult
        const result: OrientationResult = {
          rotation: new THREE.Euler(
            data.rotation.x,
            data.rotation.y,
            data.rotation.z
          ),
          metrics: data.metrics
        };
        
        resolve(result);
      });

      // Set callback per errori
      callbacksRef.current.set('error', (data) => {
        clearTimeout(timeout);
        setIsWorking(false);
        callbacksRef.current.delete('orientResult');
        callbacksRef.current.delete('orientProgress');
        callbacksRef.current.delete('error');
        reject(new Error(data.message));
      });

      // Invia richiesta al worker
      worker.postMessage({
        type: 'autoOrient',
        geometry: {
          attributes: {
            position: {
              array: geometry.attributes.position.array,
              count: geometry.attributes.position.count
            }
          }
        },
        weights
      });
    });
  }, [initWorker]);

  // Termina worker
  const terminate = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    callbacksRef.current.clear();
    setIsWorking(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      terminate();
    };
  }, [terminate]);

  return {
    calculateVolume,
    autoOrient,
    isWorking,
    terminate
  };
}; 