import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  reducedMotion?: boolean;
}

/**
 * High-performance instanced particle field.
 * Uses a single InstancedMesh draw call for thousands of particles.
 * Particles drift slowly creating a "data flowing through the void" effect.
 */
export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 1200,
  spread = 30,
  reducedMotion = false,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-compute initial positions, velocities, and scales
  const particles = useMemo(() => {
    const data: { position: THREE.Vector3; velocity: THREE.Vector3; scale: number; phase: number }[] = [];
    for (let i = 0; i < count; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003
        ),
        scale: Math.random() * 0.5 + 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, [count, spread]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const speed = reducedMotion ? 0.05 : 1.0;

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      // Gentle drift
      p.position.x += p.velocity.x * speed;
      p.position.y += p.velocity.y * speed;
      p.position.z += p.velocity.z * speed;

      // Wrap around boundaries
      const halfSpread = spread / 2;
      if (p.position.x > halfSpread) p.position.x = -halfSpread;
      if (p.position.x < -halfSpread) p.position.x = halfSpread;
      if (p.position.y > halfSpread) p.position.y = -halfSpread;
      if (p.position.y < -halfSpread) p.position.y = halfSpread;
      if (p.position.z > halfSpread) p.position.z = -halfSpread;
      if (p.position.z < -halfSpread) p.position.z = halfSpread;

      // Subtle pulsing scale
      const pulse = Math.sin(time * 0.5 + p.phase) * 0.15 + 1.0;
      const finalScale = p.scale * pulse * (reducedMotion ? 1.0 : 1.0);

      dummy.position.copy(p.position);
      dummy.scale.setScalar(finalScale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshBasicMaterial
        color="#00f0ff"
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </instancedMesh>
  );
};
