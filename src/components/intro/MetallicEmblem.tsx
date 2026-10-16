import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MetallicEmblemProps {
  phase: 'darkness' | 'initials' | 'disintegration' | 'fullname' | 'identity' | 'transition';
  reducedMotion?: boolean;
}

/**
 * 3D Sculptural Geometric Letterforms (JSR Emblem)
 * Directly inspired by Reference 2:
 * - Extruded, multi-tiered geometric letter architecture with layered concentric chamfers
 * - Deep ruby & crimson metallic reflective edges
 * - Neon scarlet luminous border wireframe
 * - Floating crystalline/metallic shards surrounding the glyphs
 */
export const MetallicEmblem: React.FC<MetallicEmblemProps> = ({
  phase,
  reducedMotion = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const shardsRef = useRef<THREE.InstancedMesh>(null);

  // Generate 48 floating metallic shards around the initials
  const shardCount = 48;
  const dummy = useRef(new THREE.Object3D());
  const shardData = useRef(
    Array.from({ length: shardCount }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4.5,
        (Math.random() - 0.5) * 4
      ),
      rot: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      speed: Math.random() * 0.02 + 0.01,
      scale: Math.random() * 0.15 + 0.05,
    }))
  );

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    const time = state.clock.elapsedTime;
    const pointer = state.pointer;

    // Smooth cinematic camera/object tracking
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.25 + Math.sin(time * 0.4) * 0.08,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.2 + Math.cos(time * 0.3) * 0.05,
      0.05
    );

    // Subtle breathing float
    groupRef.current.position.y = Math.sin(time * 1.2) * 0.08;

    // In disintegration phase, rapidly scale shards outward
    if (shardsRef.current) {
      const isDisintegrating = phase === 'disintegration' || phase === 'transition';
      const spread = isDisintegrating ? 2.5 : 1.0;

      shardData.current.forEach((shard, i) => {
        dummy.current.position.set(
          shard.pos.x * spread + Math.sin(time + i) * 0.1,
          shard.pos.y * spread + Math.cos(time + i) * 0.1,
          shard.pos.z * spread + (isDisintegrating ? (i % 2 === 0 ? 3.0 : -2.0) : 0)
        );
        dummy.current.rotation.set(
          shard.rot.x + time * shard.speed * 5,
          shard.rot.y + time * shard.speed * 4,
          shard.rot.z
        );
        dummy.current.scale.setScalar(shard.scale * (isDisintegrating ? 1.5 : 1.0));
        dummy.current.updateMatrix();
        shardsRef.current!.setMatrixAt(i, dummy.current.matrix);
      });
      shardsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Calculate visibility based on sequence phase
  const isVisible = phase === 'initials' || phase === 'disintegration';
  if (!isVisible && phase !== 'fullname') {
    // Hidden in darkness or during full name focus
  }

  return (
    <group
      ref={groupRef}
      scale={phase === 'fullname' ? 0.45 : phase === 'disintegration' ? 1.15 : 1.0}
      position={[0, phase === 'fullname' ? 2.8 : 0, 0]}
    >
      {/* 1. Core JSR Multi-tiered Geometric Architecture (Reference 2 style) */}
      <group ref={coreRef}>
        {/* Tier 1: Outer glowing neon crimson bevel */}
        <mesh position={[0, 0, 0.1]}>
          <ringGeometry args={[2.0, 2.05, 64]} />
          <meshBasicMaterial
            color="#ff2a4b"
            transparent
            opacity={phase === 'darkness' ? 0 : 0.8}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Tier 2: Extruded Octagonal Chamfered Bezel */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[2.4, 2.6, 0.2, 8]} />
          <meshStandardMaterial
            color="#140608"
            roughness={0.2}
            metalness={0.9}
            emissive="#4a0714"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Tier 3: Secondary Ruby Stepped Border */}
        <mesh position={[0, 0, 0.12]}>
          <cylinderGeometry args={[2.1, 2.3, 0.1, 8]} />
          <meshStandardMaterial
            color="#2b080f"
            roughness={0.15}
            metalness={0.95}
            emissive="#800f24"
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* Tier 4: Inner Dark Obsidian Recess with glowing grid lines */}
        <mesh position={[0, 0, 0.18]}>
          <cylinderGeometry args={[1.8, 1.8, 0.05, 8]} />
          <meshStandardMaterial
            color="#050505"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>

        {/* Inner Concentric Prismatic Rings */}
        <mesh position={[0, 0, 0.22]}>
          <torusGeometry args={[1.4, 0.03, 16, 64]} />
          <meshBasicMaterial color="#e32636" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.24]}>
          <torusGeometry args={[1.0, 0.025, 16, 64]} />
          <meshBasicMaterial color="#ff4458" transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </mesh>

        {/* Central Monogram Sculptural Glyph */}
        <group position={[0, 0, 0.3]}>
          {/* Central Pyramid / Triangle Apex (Inspired by Reference 2 'A' / geometric chevron) */}
          <mesh rotation={[0, 0, Math.PI / 4]} position={[0, 0, 0]}>
            <octahedronGeometry args={[0.75, 0]} />
            <meshStandardMaterial
              color="#e32636"
              metalness={0.9}
              roughness={0.1}
              emissive="#800f24"
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Wireframe overlay on apex for technical precision */}
          <mesh rotation={[0, 0, Math.PI / 4]} position={[0, 0, 0]}>
            <octahedronGeometry args={[0.77, 0]} />
            <meshBasicMaterial
              color="#ffffff"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>
        </group>
      </group>

      {/* 2. Floating metallic shards / fragment storm (Reference 1 & 2) */}
      <instancedMesh ref={shardsRef} args={[undefined, undefined, shardCount]}>
        <tetrahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color="#ff2a4b"
          metalness={0.95}
          roughness={0.1}
          emissive="#800f24"
          emissiveIntensity={0.8}
        />
      </instancedMesh>
    </group>
  );
};
