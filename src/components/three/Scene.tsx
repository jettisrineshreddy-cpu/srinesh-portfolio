import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { isWebGLAvailable } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useDeviceCapabilities } from '../../hooks/useDeviceCapabilities';
import { ParticleField } from './ParticleField';
import { DataGrid } from './DataGrid';
import { FloatingNodes } from './FloatingNodes';
import { ScrollRig } from './ScrollRig';

/**
 * The main 3D scene container.
 * - Detects WebGL availability → falls back to a polished static gradient if unavailable.
 * - Respects prefers-reduced-motion → dramatically slows/disables animation.
 * - Adapts particle count and DPR to device capabilities.
 */
export const Scene: React.FC = () => {
  const hasWebGL = isWebGLAvailable();
  const prefersReduced = useReducedMotion();
  const { particleCount, dpr, isMobile } = useDeviceCapabilities();

  // Graceful static fallback if WebGL is not available, or on mobile for max scroll performance
  if (!hasWebGL || isMobile) {
    return <div className="webgl-fallback" aria-hidden="true" />;
  }

  return (
    <div className="webgl-container" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 15], fov: isMobile ? 65 : 55, near: 0.1, far: 100 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <ScrollRig reducedMotion={prefersReduced} />
          
          {/* Ambient atmospheric light */}
          <ambientLight intensity={0.3} />

          {/* Particle field: the primary visual element */}
          <ParticleField
            count={particleCount}
            spread={30}
            reducedMotion={prefersReduced}
          />

          {/* Data grid floor */}
          <DataGrid reducedMotion={prefersReduced} />

          {/* Floating geometric nodes (skip on low-end mobile to save perf) */}
          {!isMobile && (
            <FloatingNodes
              count={18}
              reducedMotion={prefersReduced}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
