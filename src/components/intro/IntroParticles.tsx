import { useRef, useMemo, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 600;
const SPREAD_X = 6;
const SPREAD_Y = 2.5;
const SPREAD_Z = 2;

interface ParticleData {
  positions: Float32Array;
  velocities: Float32Array;
  sizes: Float32Array;
  colors: Float32Array;
  lifetimes: Float32Array;
}

export interface IntroParticlesHandle {
  setOpacity: (v: number) => void;
}

function initParticle(
  positions: Float32Array,
  velocities: Float32Array,
  sizes: Float32Array,
  colors: Float32Array,
  lifetimes: Float32Array,
  i: number
) {
  const i3 = i * 3;
  // Concentrate particles around center with gaussian-like distribution
  positions[i3] = (Math.random() - 0.5) * SPREAD_X * (0.3 + Math.random() * 0.7);
  positions[i3 + 1] = (Math.random() - 0.5) * SPREAD_Y * (0.3 + Math.random() * 0.7);
  positions[i3 + 2] = (Math.random() - 0.5) * SPREAD_Z;

  // Slow drift: mostly upward with slight horizontal wobble
  velocities[i3] = (Math.random() - 0.5) * 0.15;
  velocities[i3 + 1] = 0.05 + Math.random() * 0.2;
  velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;

  // Size variation
  sizes[i] = 0.005 + Math.random() * 0.025;

  // Color: deep crimson to bright red-orange
  const t = Math.random();
  if (t < 0.4) {
    // Deep crimson
    colors[i3] = 0.55 + Math.random() * 0.15;
    colors[i3 + 1] = 0.02 + Math.random() * 0.05;
    colors[i3 + 2] = 0.03 + Math.random() * 0.06;
  } else if (t < 0.75) {
    // Bright red
    colors[i3] = 0.85 + Math.random() * 0.15;
    colors[i3 + 1] = 0.08 + Math.random() * 0.12;
    colors[i3 + 2] = 0.05 + Math.random() * 0.1;
  } else {
    // Hot orange-white ember
    colors[i3] = 0.95 + Math.random() * 0.05;
    colors[i3 + 1] = 0.3 + Math.random() * 0.35;
    colors[i3 + 2] = 0.15 + Math.random() * 0.2;
  }

  // Random lifetime offset for staggered appearance
  lifetimes[i] = Math.random() * 6;
}

export const IntroParticles = forwardRef<IntroParticlesHandle>(function IntroParticles(_, ref) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo<ParticleData>(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const lifetimes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      initParticle(positions, velocities, sizes, colors, lifetimes, i);
    }

    return { positions, velocities, sizes, colors, lifetimes };
  }, []);

  useImperativeHandle(ref, () => ({
    setOpacity: (v: number) => {
      if (materialRef.current) {
        materialRef.current.opacity = v;
      }
    },
  }));

  // Initialize instance colors
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const color = new THREE.Color();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      color.setRGB(data.colors[i3], data.colors[i3 + 1], data.colors[i3 + 2]);
      mesh.setColorAt(i, color);
    }
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }, [data]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const dt = Math.min(delta, 0.05); // Cap delta for tab-switching

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Update lifetime
      data.lifetimes[i] += dt;

      // Move particles
      data.positions[i3] += data.velocities[i3] * dt;
      data.positions[i3 + 1] += data.velocities[i3 + 1] * dt;
      data.positions[i3 + 2] += data.velocities[i3 + 2] * dt;

      // Add subtle sinusoidal wobble
      data.positions[i3] += Math.sin(data.lifetimes[i] * 1.5 + i * 0.1) * 0.003;

      // Recycle particles that drift too far
      const x = data.positions[i3];
      const y = data.positions[i3 + 1];
      const z = data.positions[i3 + 2];
      if (
        Math.abs(x) > SPREAD_X * 0.8 ||
        Math.abs(y) > SPREAD_Y * 1.2 ||
        Math.abs(z) > SPREAD_Z * 1.5
      ) {
        initParticle(
          data.positions,
          data.velocities,
          data.sizes,
          data.colors,
          data.lifetimes,
          i
        );
      }

      // Update instance matrix
      dummy.position.set(
        data.positions[i3],
        data.positions[i3 + 1],
        data.positions[i3 + 2]
      );
      const s = data.sizes[i];
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, PARTICLE_COUNT]}
      renderOrder={10}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        ref={materialRef}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </instancedMesh>
  );
});
