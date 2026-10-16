import { useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { IntroParticles } from './IntroParticles';
import type { IntroParticlesHandle } from './IntroParticles';

export interface IntroSceneHandle {
  setHazeOpacity: (v: number) => void;
  setParticlesOpacity: (v: number) => void;
  setSweepX: (v: number) => void;
}

/**
 * R3F scene rendered behind the HTML text overlay.
 * Provides:
 * 1. Crimson atmospheric haze plane
 * 2. Floating ember particles
 * 3. Horizontal light sweep
 * 4. Crimson point lighting
 */
export const IntroScene = forwardRef<IntroSceneHandle>(function IntroScene(_, ref) {
  const hazeRef = useRef<THREE.MeshBasicMaterial>(null);
  const sweepRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<IntroParticlesHandle>(null);

  // Expose controls for GSAP
  useImperativeHandle(ref, () => ({
    setHazeOpacity: (v: number) => {
      if (hazeRef.current) {
        hazeRef.current.opacity = v;
      }
    },
    setParticlesOpacity: (v: number) => {
      if (particlesRef.current) {
        particlesRef.current.setOpacity(v);
      }
    },
    setSweepX: (v: number) => {
      if (sweepRef.current) {
        sweepRef.current.position.x = v;
      }
    },
  }));

  // Haze gradient texture (radial crimson)
  const hazeTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
      );
      gradient.addColorStop(0, 'rgba(227, 24, 55, 0.45)');
      gradient.addColorStop(0.3, 'rgba(181, 14, 38, 0.25)');
      gradient.addColorStop(0.6, 'rgba(100, 6, 20, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Sweep gradient texture (vertical line of light)
  const sweepTexture = useMemo(() => {
    const w = 128;
    const h = 512;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, w, 0);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(0.3, 'rgba(181, 18, 43, 0.06)');
      gradient.addColorStop(0.5, 'rgba(255, 50, 80, 0.15)');
      gradient.addColorStop(0.7, 'rgba(181, 18, 43, 0.06)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Subtle pulsing on the haze
  useFrame(({ clock }) => {
    if (hazeRef.current) {
      const base = hazeRef.current.userData.baseOpacity ?? hazeRef.current.opacity;
      hazeRef.current.userData.baseOpacity = base;
      const pulse = Math.sin(clock.elapsedTime * 0.8) * 0.03;
      hazeRef.current.opacity = Math.max(0, base + pulse);
    }
  });

  return (
    <>
      {/* Ambient crimson haze */}
      <mesh position={[0, 0, -2]} renderOrder={1}>
        <planeGeometry args={[12, 6]} />
        <meshBasicMaterial
          ref={hazeRef}
          map={hazeTexture}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Horizontal light sweep */}
      <mesh ref={sweepRef} position={[-10, 0, -1]} renderOrder={2}>
        <planeGeometry args={[2, 6]} />
        <meshBasicMaterial
          map={sweepTexture}
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Crimson point light for subtle volumetric feel */}
      <pointLight
        color="#e31837"
        intensity={2}
        distance={15}
        position={[0, 0, 3]}
      />
      <ambientLight intensity={0.02} color="#1a0005" />

      {/* Particle embers */}
      <IntroParticles ref={particlesRef} />
    </>
  );
});
