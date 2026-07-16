import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { BufferGeometryLoader } from 'three'; // Importa BufferGeometryLoader
import { autoOrientSTL } from '../utils/stlAutoOrientation';

self.onmessage = async (e) => {
  const { geometry, weights } = e.data;
  const loader = new BufferGeometryLoader(); // Crea un'istanza del loader
  const threeGeometry = loader.parse(geometry); // Usa il loader per parsare il JSON
  const result = await autoOrientSTL(threeGeometry, weights);
  self.postMessage(result);
};