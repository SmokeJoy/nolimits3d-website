import * as THREE from 'three';

/**
 * Allinea la mesh al bed:
 *  ▸ abbassa il punto più basso a y = 0
 *  ▸ (opzionale) centra la bounding-box sull’origine X-Z
 */
export const dropMeshOnBed = (
  mesh: THREE.Object3D,
  centerXZ = true // <-- mantenuto opzionale per retro-compatibilità
) => {
  mesh.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(mesh);
  if (box.isEmpty()) return;

  // 1️⃣ poggia sul piano
  mesh.position.y -= box.min.y;

  // 2️⃣ centra sull’origine X-Z
  if (centerXZ) {
    const center = box.getCenter(new THREE.Vector3());
    mesh.position.x -= center.x;
    mesh.position.z -= center.z;
  }

  mesh.updateMatrixWorld(true);
};