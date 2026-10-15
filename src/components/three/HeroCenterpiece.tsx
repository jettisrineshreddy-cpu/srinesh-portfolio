import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeroCenterpieceProps {
  reducedMotion?: boolean;
}

/**
 * An artistic, mathematical 3D sculpture representing neural networks and data science.
 * Features an organic multi-ring gyroscopic neural lattice with dynamic ruby/scarlet
 * light refraction and responsive pointer-tilt.
 */
export const HeroCenterpiece: React.FC<HeroCenterpieceProps> = ({ reducedMotion = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Group>(null);
  const midRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.elapsedTime;
    const pointer = state.pointer;

    // Smooth whole-group tracking of pointer
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.35, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.45, 0.05);
      groupRef.current.position.y = 1.6 + Math.sin(time * 0.8) * 0.18;
    }

    // Outer cage slow organic rotation
    if (outerRef.current) {
      outerRef.current.rotation.x = time * 0.09;
      outerRef.current.rotation.y = time * 0.13;
    }

    // Gyroscopic rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.2;
      ring1Ref.current.rotation.z = time * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.18;
      ring2Ref.current.rotation.x = time * 0.12;
    }

    // Mid dual icosahedron counter-rotation
    if (midRef.current) {
      midRef.current.rotation.x = -time * 0.12;
      midRef.current.rotation.z = time * 0.16;
    }

    // Core pulsing light & scale
    if (innerRef.current) {
      const pulse = 1 + Math.sin(time * 2.2) * 0.1;
      innerRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[4.6, 1.6, 2.2]} ref={groupRef}>
      {/* Outer subtle geometric wireframe */}
      <group ref={outerRef}>
        <mesh>
          <icosahedronGeometry args={[3.0, 1]} />
          <meshBasicMaterial
            color="#e32636"
            wireframe
            transparent
            opacity={0.09}
            depthWrite={false}
          />
        </mesh>

        {/* Outer orbital vertices */}
        <points>
          <icosahedronGeometry args={[3.0, 1]} />
          <pointsMaterial
            color="#ffffff"
            size={0.07}
            transparent
            opacity={0.4}
            sizeAttenuation
            depthWrite={false}
          />
        </points>

        {/* Gyroscopic orbital rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.5, 0.015, 16, 64]} />
          <meshBasicMaterial color="#b5122b" transparent opacity={0.35} depthWrite={false} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.2, 0.012, 16, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.25} depthWrite={false} />
        </mesh>

        {/* Mid dual octahedron lattice */}
        <group ref={midRef}>
          <mesh>
            <octahedronGeometry args={[1.9, 0]} />
            <meshBasicMaterial
              color="#e32636"
              wireframe
              transparent
              opacity={0.22}
              depthWrite={false}
            />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
            <octahedronGeometry args={[1.5, 0]} />
            <meshBasicMaterial
              color="#ffffff"
              wireframe
              transparent
              opacity={0.16}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* Inner core node - ruby glowing nucleus */}
        <mesh ref={innerRef}>
          <dodecahedronGeometry args={[0.65, 0]} />
          <meshBasicMaterial
            color="#ff4458"
            wireframe
            transparent
            opacity={0.65}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
};
