import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DataGridProps {
  reducedMotion?: boolean;
}

/**
 * A slowly rotating, translucent wireframe grid plane
 * that evokes a digital/data-engineering floor aesthetic.
 */
export const DataGrid: React.FC<DataGridProps> = ({ reducedMotion = false }) => {
  const gridRef = useRef<THREE.Group>(null);

  // Create grid line geometry procedurally
  const gridLines = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const size = 40;
    const divisions = 40;
    const step = size / divisions;
    const half = size / 2;

    for (let i = 0; i <= divisions; i++) {
      const pos = -half + i * step;
      // Horizontal lines
      points.push(new THREE.Vector3(-half, 0, pos));
      points.push(new THREE.Vector3(half, 0, pos));
      // Vertical lines
      points.push(new THREE.Vector3(pos, 0, -half));
      points.push(new THREE.Vector3(pos, 0, half));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, []);

  useFrame((state) => {
    if (!gridRef.current || reducedMotion) return;
    gridRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
  });

  return (
    <group ref={gridRef} position={[0, -8, 0]}>
      <lineSegments geometry={gridLines}>
        <lineBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};
