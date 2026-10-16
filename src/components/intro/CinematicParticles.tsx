import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CinematicParticlesProps {
  phase: 'darkness' | 'initials' | 'disintegration' | 'fullname' | 'identity' | 'transition';
  reducedMotion?: boolean;
}

/**
 * High performance cinematic particle system for the Hollywood intro:
 * - Tiny floating red embers and sparks (darkness)
 * - Converging glowing particles that form the letters (initials)
 * - Explosive directional disintegration & horizontal laser streaks (Reference 1)
 * - Volumetric depth particles flying past camera
 */
export const CinematicParticles: React.FC<CinematicParticlesProps> = ({
  phase,
  reducedMotion = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const streaksRef = useRef<THREE.LineSegments>(null);

  // 1. Dust & Sparks Particle System (2,500 particles)
  const particleCount = 2500;
  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const colorCrimson = new THREE.Color('#800f24');
    const colorScarlet = new THREE.Color('#e32636');
    const colorRuby = new THREE.Color('#ff2a4b');
    const colorOrange = new THREE.Color('#ff6a00');
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical spread in front of camera
      const radius = Math.random() * 18 + 0.5;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 22;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Random micro-velocities
      vel[i * 3] = (Math.random() - 0.5) * 0.04;
      vel[i * 3 + 1] = Math.random() * 0.03 + 0.01; // subtle upward drift
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.04;

      // Color variation inspired by References 1 & 3:
      // Intense red-orange sparks mixed with deep ruby dust
      const rand = Math.random();
      let c = colorCrimson;
      if (rand > 0.85) c = colorWhite;
      else if (rand > 0.65) c = colorOrange;
      else if (rand > 0.35) c = colorScarlet;
      else c = colorRuby;

      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, vel, col];
  }, []);

  // 2. Horizontal Light Streaks (Inspired by Reference 1 - EUSION particle streaks)
  const streakCount = 120;
  const streakPositions = useMemo(() => {
    const pos = new Float32Array(streakCount * 6);
    for (let i = 0; i < streakCount; i++) {
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 6;
      const length = Math.random() * 3.5 + 1.0;

      // Start vertex
      pos[i * 6] = x;
      pos[i * 6 + 1] = y;
      pos[i * 6 + 2] = z;

      // End vertex (stretched along X-axis)
      pos[i * 6 + 3] = x + length;
      pos[i * 6 + 4] = y;
      pos[i * 6 + 5] = z;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.elapsedTime;
    const pointer = state.pointer;

    // Animate dust particles
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const array = posAttr.array as Float32Array;

      // In disintegration or transition phase, accelerate particles toward viewer and outwards
      const explosionMultiplier = phase === 'disintegration' ? 4.5 : phase === 'transition' ? 6.0 : 1.0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        array[i3] += velocities[i3] * explosionMultiplier;
        array[i3 + 1] += velocities[i3 + 1] * explosionMultiplier;
        array[i3 + 2] += velocities[i3 + 2] * explosionMultiplier;

        // Wrap around boundaries
        if (array[i3 + 1] > 8) array[i3 + 1] = -8;
        if (array[i3] > 18) array[i3] = -18;
        if (array[i3] < -18) array[i3] = 18;
        if (array[i3 + 2] > 12) array[i3 + 2] = -10;
        if (array[i3 + 2] < -12) array[i3 + 2] = 10;
      }

      posAttr.needsUpdate = true;

      // Slow dynamic camera responsiveness
      pointsRef.current.rotation.y = time * 0.02 + pointer.x * 0.05;
      pointsRef.current.rotation.x = -pointer.y * 0.05;
    }

    // Animate horizontal streaks (drift and shimmer)
    if (streaksRef.current) {
      streaksRef.current.position.x = Math.sin(time * 0.5) * 2;
      streaksRef.current.rotation.z = Math.sin(time * 0.2) * 0.02;
    }
  });

  return (
    <group>
      {/* 3D Ember Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={phase === 'darkness' ? 0.35 : 0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Horizontal Light Streaks (Reference 1) */}
      <lineSegments ref={streaksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[streakPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#e32636"
          transparent
          opacity={phase === 'darkness' ? 0.15 : phase === 'disintegration' ? 0.8 : 0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};
