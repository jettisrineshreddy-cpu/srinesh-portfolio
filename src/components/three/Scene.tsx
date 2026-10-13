import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { isWebGLAvailable } from '../../lib/utils';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useDeviceCapabilities } from '../../hooks/useDeviceCapabilities';
import { ParticleField } from './ParticleField';
import { DataGrid } from './DataGrid';
import { FloatingNodes } from './FloatingNodes';
import { HeroCenterpiece } from './HeroCenterpiece';
import { ScrollRig } from './ScrollRig';
import { RoomWorld, type RoomStationId } from './RoomWorld';

interface SceneProps {
  is3DMode?: boolean;
  currentStation?: RoomStationId;
  onSelectStation?: (id: RoomStationId) => void;
}

/**
 * The main 3D scene container.
 * - Supports dual modes:
 *   1. Ambient Spatial Editorial Scene (background for main page)
 *   2. Full WebGL 3D Room / Workstation World (immersive walk-through)
 */
export const Scene: React.FC<SceneProps> = ({
  is3DMode = false,
  currentStation = 'overview',
  onSelectStation = () => {},
}) => {
  const hasWebGL = isWebGLAvailable();
  const prefersReduced = useReducedMotion();
  const { particleCount, dpr, isMobile } = useDeviceCapabilities();

  // Graceful static fallback if WebGL is not available
  if (!hasWebGL) {
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
          {is3DMode ? (
            <RoomWorld
              currentStation={currentStation}
              onSelectStation={onSelectStation}
            />
          ) : (
            <>
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
                <>
                  <FloatingNodes
                    count={18}
                    reducedMotion={prefersReduced}
                  />
                  <HeroCenterpiece
                    reducedMotion={prefersReduced}
                  />
                </>
              )}
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};
