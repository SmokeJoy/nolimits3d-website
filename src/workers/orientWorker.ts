import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { autoOrientSTL } from '../utils/stlAutoOrientation';

self.onmessage = async (e) => {
  const { stlArrayBuffer, weights } = e.data;
  const loader = new STLLoader();
  const geometry = loader.parse(stlArrayBuffer);
  const result = await autoOrientSTL(geometry, weights);
  self.postMessage(result);
};