import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CinematicParticles } from './CinematicParticles';
import { MetallicEmblem } from './MetallicEmblem';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CinematicIntroSceneProps {
  phase: 'darkness' | 'initials' | 'disintegration' | 'fullname' | 'identity' | 'transition';
}

/**
 * Three.js 3D WebGL Canvas for the Hollywood Intro Sequence:
 * - Controlled atmospheric point & spotlighting
 * - Deep crimson fog blending seamlessly into black #050505
 * - Cinematic particle embers, horizontal laser streaks, and fragment disintegration
 * - Concentric 3D metallic letter architecture
 */
export const CinematicIntroScene: React.FC<CinematicIntroSceneProps> = ({ phase }) => {
  const prefersReduced = useReducedMotion();

  return (
    <div className="intro__canvas-container" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 50, near: 0.1, far: 100 }}
        dpr={Math.min(window.devicePixelRatio || 1, 2)}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          {/* Deep cinematic fog into black */}
          <fog attach="fog" args={['#050505', 8, 26]} />

          {/* Controlled Key & Rim Lighting */}
          <ambientLight intensity={0.25} />
          {/* Top-right crimson key light */}
          <spotLight
            position={[8, 10, 8]}
            angle={0.6}
            penumbra={0.9}
            intensity={phase === 'darkness' ? 0.3 : 1.8}
            color="#ff2a4b"
          />
          {/* Left-bottom ruby fill light */}
          <pointLight
            position={[-8, -6, 5]}
            intensity={phase === 'darkness' ? 0.2 : 1.2}
            color="#800f24"
            distance={25}
          />
          {/* Intense back rim light creating sharp specular reflections */}
          <directionalLight
            position={[0, 4, -6]}
            intensity={phase === 'fullname' ? 2.5 : 1.4}
            color="#ffffff"
          />

          {/* 3D Cinematic Particle System & Horizontal Streaks */}
          <CinematicParticles phase={phase} reducedMotion={prefersReduced} />

          {/* 3D Concentric Metallic Emblem Architecture */}
          <MetallicEmblem phase={phase} reducedMotion={prefersReduced} />
        </Suspense>
      </Canvas>
    </div>
  );
};
