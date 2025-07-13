import * as THREE from 'three';

/** Sposta la mesh in modo che il punto più basso tocchi il piano XY (y = 0) */
export const dropMeshOnBed = (mesh: THREE.Object3D) => {
  // assicura che tutte le trasformazioni siano applicate
  mesh.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(mesh);
  if (!box.min || isNaN(box.min.y)) return;

  mesh.position.y -= box.min.y;          // y = 0
  mesh.updateMatrixWorld(true);          // aggiorna di nuovo
}; 