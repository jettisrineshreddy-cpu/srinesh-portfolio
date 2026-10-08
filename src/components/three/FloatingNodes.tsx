import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingNodesProps {
  count?: number;
  reducedMotion?: boolean;
}

/**
 * Floating geometric nodes connected by faint lines,
 * representing data connections / neural network structure.
 */
export const FloatingNodes: React.FC<FloatingNodesProps> = ({
  count = 18,
  reducedMotion = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const data: { position: THREE.Vector3; speed: number; phase: number; size: number }[] = [];
    for (let i = 0; i < count; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 12 - 5
        ),
        speed: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
        size: Math.random() * 0.12 + 0.06,
      });
    }
    return data;
  }, [count]);

  // Pre-compute connection lines between nearby nodes
  const connections = useMemo(() => {
    const lines: [number, number][] = [];
    const maxDist = 8;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < maxDist) {
          lines.push([i, j]);
        }
      }
    }
    return lines;
  }, [nodes]);

  const lineGeomRef = useRef<THREE.BufferGeometry>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Animate node positions (bob gently)
    groupRef.current.children.forEach((child, i) => {
      if (i >= nodes.length) return;
      const node = nodes[i];
      if (!reducedMotion) {
        child.position.y =
          node.position.y + Math.sin(time * node.speed + node.phase) * 0.5;
        child.position.x =
          node.position.x + Math.cos(time * node.speed * 0.7 + node.phase) * 0.3;
      }
    });

    // Update connection line positions
    if (lineGeomRef.current) {
      const positions = lineGeomRef.current.attributes.position.array as Float32Array;
      let idx = 0;
      for (const [a, b] of connections) {
        const childA = groupRef.current.children[a];
        const childB = groupRef.current.children[b];
        if (childA && childB) {
          positions[idx++] = childA.position.x;
          positions[idx++] = childA.position.y;
          positions[idx++] = childA.position.z;
          positions[idx++] = childB.position.x;
          positions[idx++] = childB.position.y;
          positions[idx++] = childB.position.z;
        }
      }
      lineGeomRef.current.attributes.position.needsUpdate = true;
    }
  });

  // Allocate line positions buffer
  const linePositions = useMemo(() => {
    return new Float32Array(connections.length * 6);
  }, [connections]);

  return (
    <>
      <group ref={groupRef}>
        {nodes.map((node, i) => (
          <mesh key={i} position={node.position.toArray()}>
            <octahedronGeometry args={[node.size, 0]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.15}
              wireframe
            />
          </mesh>
        ))}
      </group>

      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry ref={lineGeomRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={connections.length * 2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </lineSegments>
    </>
  );
};
