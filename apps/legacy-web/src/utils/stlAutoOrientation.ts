import * as THREE from 'three';

export interface OrientationResult {
  rotation: THREE.Euler;
  metrics: {
    supportArea: number;      // cm²
    printHeight: number;      // mm
    baseStability: number;    // 0-1 score
    totalScore: number;       // lower is better
  };
  orientedGeometry: THREE.BufferGeometry;
}

export interface AutoOrientationWeights {
  support: number;     // Weight for support area penalty
  time: number;        // Weight for print time (height) penalty  
  stability: number;   // Weight for base stability bonus
}

// Default weights optimized for cost reduction
const DEFAULT_WEIGHTS: AutoOrientationWeights = {
  support: 0.5,    // 50% - Support material is expensive
  time: 0.3,       // 30% - Print time affects machine cost
  stability: 0.2   // 20% - Stability affects print success
};

/**
 * Generate 24 standard orientations (combinations of 90° rotations on X, Y, Z axes)
 */
function generateOrientations(): THREE.Euler[] {
  const orientations: THREE.Euler[] = [];
  
  // Generate rotations in 90° increments
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      for (let z = 0; z < 2; z++) { // Only 0° and 180° for Z to avoid duplicates
        if (x === 0 && y === 0 && z === 0) continue; // Skip identity
        orientations.push(new THREE.Euler(
          x * Math.PI / 2,
          y * Math.PI / 2, 
          z * Math.PI,
          'XYZ'
        ));
      }
    }
  }
  
  // Add identity orientation
  orientations.unshift(new THREE.Euler(0, 0, 0, 'XYZ'));
  
  return orientations.slice(0, 24); // Limit to 24 main orientations
}

/**
 * Apply rotation to geometry and return oriented copy
 */
function applyOrientation(geometry: THREE.BufferGeometry, rotation: THREE.Euler): THREE.BufferGeometry {
  const orientedGeometry = geometry.clone();
  const matrix = new THREE.Matrix4().makeRotationFromEuler(rotation);
  orientedGeometry.applyMatrix4(matrix);
  orientedGeometry.computeBoundingBox();
  return orientedGeometry;
}

/**
 * Calculate support area for geometry (faces facing down with > 45° overhang)
 */
function calculateSupportArea(geometry: THREE.BufferGeometry): number {
  try {
    if (!geometry.attributes.position) return 0;
    
    const position = geometry.attributes.position;
    let supportArea = 0;
    const overhangThreshold = Math.cos(Math.PI / 4); // 45° in radians
    
    // Calculate normals if not present
    if (!geometry.attributes.normal) {
      geometry.computeVertexNormals();
    }
    
    const normal = geometry.attributes.normal;
    if (!normal) return 0;
    
    // Iterate through triangles
    for (let i = 0; i < position.count; i += 3) {
      try {
        // Get triangle vertices
        const v1 = new THREE.Vector3().fromBufferAttribute(position, i);
        const v2 = new THREE.Vector3().fromBufferAttribute(position, i + 1);
        const v3 = new THREE.Vector3().fromBufferAttribute(position, i + 2);
        
        // Get average normal for triangle
        const n1 = new THREE.Vector3().fromBufferAttribute(normal, i);
        const n2 = new THREE.Vector3().fromBufferAttribute(normal, i + 1);
        const n3 = new THREE.Vector3().fromBufferAttribute(normal, i + 2);
        const avgNormal = n1.add(n2).add(n3).normalize();
        
        // Check if face needs support (facing down with > 45° overhang)
        const downDot = avgNormal.dot(new THREE.Vector3(0, -1, 0));
        if (downDot > overhangThreshold) {
          // Calculate triangle area
          const edge1 = v2.clone().sub(v1);
          const edge2 = v3.clone().sub(v1);
          const triangleArea = edge1.cross(edge2).length() / 2;
          supportArea += triangleArea;
        }
      } catch (error) {
        continue; // Skip problematic triangles
      }
    }
    
    // Convert from mm² to cm²
    return supportArea / 100;
    
  } catch (error) {
    console.warn('Error calculating support area:', error);
    return 0;
  }
}

/**
 * Calculate base stability (contact area with build plate)
 */
function calculateBaseStability(geometry: THREE.BufferGeometry): number {
  try {
    if (!geometry.boundingBox) {
      geometry.computeBoundingBox();
    }
    
    const bbox = geometry.boundingBox!;
    const minY = bbox.min.y;
    const tolerance = 0.1; // 0.1mm tolerance for "touching" build plate
    
    if (!geometry.attributes.position) return 0;
    
    const position = geometry.attributes.position;
    let baseArea = 0;
    
    // Find triangles near the build plate (Y = minY)
    for (let i = 0; i < position.count; i += 3) {
      try {
        const v1 = new THREE.Vector3().fromBufferAttribute(position, i);
        const v2 = new THREE.Vector3().fromBufferAttribute(position, i + 1);
        const v3 = new THREE.Vector3().fromBufferAttribute(position, i + 2);
        
        // Check if triangle is touching build plate
        const avgY = (v1.y + v2.y + v3.y) / 3;
        if (Math.abs(avgY - minY) <= tolerance) {
          // Calculate triangle area
          const edge1 = v2.clone().sub(v1);
          const edge2 = v3.clone().sub(v1);
          const triangleArea = edge1.cross(edge2).length() / 2;
          baseArea += triangleArea;
        }
      } catch (error) {
        continue;
      }
    }
    
    // Normalize by bounding box base area
    const bboxBaseArea = (bbox.max.x - bbox.min.x) * (bbox.max.z - bbox.min.z);
    return bboxBaseArea > 0 ? Math.min(baseArea / bboxBaseArea, 1) : 0;
    
  } catch (error) {
    console.warn('Error calculating base stability:', error);
    return 0;
  }
}

/**
 * Calculate optimization score for an orientation (lower is better)
 */
function calculateScore(
  supportArea: number, 
  printHeight: number, 
  baseStability: number, 
  weights: AutoOrientationWeights
): number {
  // Normalize metrics to 0-1 range for scoring
  const normalizedSupport = Math.min(supportArea / 50, 1); // Assume 50cm² as "high" support
  const normalizedHeight = Math.min(printHeight / 200, 1); // Assume 200mm as "high" height
  const stabilityBonus = baseStability; // Already 0-1
  
  // Calculate weighted score (lower is better)
  const score = (weights.support * normalizedSupport) + 
                (weights.time * normalizedHeight) - 
                (weights.stability * stabilityBonus);
  
  return Math.max(score, 0);
}

/**
 * Auto-orient STL geometry to minimize supports and print time
 */
export async function autoOrientSTL(
  geometry: THREE.BufferGeometry,
  weights: AutoOrientationWeights = DEFAULT_WEIGHTS
): Promise<OrientationResult> {
  
  return new Promise((resolve) => {
    try {
      const orientations = generateOrientations();
      let bestResult: OrientationResult | null = null;
      let bestScore = Infinity;
      let i = 0;

      const testNextOrientation = () => {
        if (i >= orientations.length) {
          if (!bestResult) {
            geometry.computeBoundingBox();
            bestResult = {
              rotation: new THREE.Euler(0, 0, 0, 'XYZ'),
              metrics: {
                supportArea: 0,
                printHeight: geometry.boundingBox ? 
                  (geometry.boundingBox.max.y - geometry.boundingBox.min.y) : 100,
                baseStability: 0.5,
                totalScore: 1
              },
              orientedGeometry: geometry.clone()
            };
          }
          resolve(bestResult);
          return;
        }

        const rotation = orientations[i];
        try {
          const orientedGeometry = applyOrientation(geometry, rotation);
          
          const supportArea = calculateSupportArea(orientedGeometry);
          const printHeight = orientedGeometry.boundingBox ? 
            (orientedGeometry.boundingBox.max.y - orientedGeometry.boundingBox.min.y) : 0;
          const baseStability = calculateBaseStability(orientedGeometry);
          const totalScore = calculateScore(supportArea, printHeight, baseStability, weights);
          
          if (totalScore < bestScore) {
            bestScore = totalScore;
            bestResult = {
              rotation,
              metrics: {
                supportArea,
                printHeight,
                baseStability,
                totalScore
              },
              orientedGeometry
            };
          }
        } catch (error) {
          console.warn('Error testing orientation:', rotation, error);
        }

        i++;
        setTimeout(testNextOrientation, 0);
      };

      testNextOrientation();
    } catch (error) {
      console.error('Auto-orientation failed:', error);
      geometry.computeBoundingBox();
      resolve({
        rotation: new THREE.Euler(0, 0, 0, 'XYZ'),
        metrics: {
          supportArea: 0,
          printHeight: geometry.boundingBox ? 
            (geometry.boundingBox.max.y - geometry.boundingBox.min.y) : 100,
          baseStability: 0.5,
          totalScore: 1
        },
        orientedGeometry: geometry.clone()
      });
    }
  });
} 