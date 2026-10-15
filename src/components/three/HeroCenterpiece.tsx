import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeroCenterpieceProps {
  reducedMotion?: boolean;
}

/**
 * An elegant, lightweight interactive centerpiece for the Hero section.
 * Represents complex algorithmic structure & neural geometry with
 * concentric rotating geodesic icosahedron wireframes and an inner glowing core.
 * Responds gently to pointer movement and scroll.
 */
export const HeroCenterpiece: React.FC<HeroCenterpieceProps> = ({ reducedMotion = false }) => {
  const outerRef = useRef<THREE.Group>(null);
  const midRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const time = state.clock.elapsedTime;
    const pointer = state.pointer;

    // Outer cage slow rotation with pointer parallax
    if (outerRef.current) {
      outerRef.current.rotation.x = time * 0.08 + pointer.y * 0.2;
      outerRef.current.rotation.y = time * 0.12 + pointer.x * 0.25;
      outerRef.current.position.y = 1.5 + Math.sin(time * 0.7) * 0.15;
    }

    // Mid ring counter-rotation
    if (midRef.current) {
      midRef.current.rotation.x = -time * 0.1 + pointer.y * 0.15;
      midRef.current.rotation.z = time * 0.14 - pointer.x * 0.2;
    }

    // Core subtle breathing
    if (innerRef.current) {
      const scale = 1 + Math.sin(time * 1.5) * 0.08;
      innerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={[4.5, 1.5, 2]}>
      {/* Outer subtle geometric wireframe */}
      <group ref={outerRef}>
        <mesh>
          <icosahedronGeometry args={[2.8, 1]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.06}
            depthWrite={false}
          />
        </mesh>

        {/* Outer points / vertices */}
        <points>
          <icosahedronGeometry args={[2.8, 1]} />
          <pointsMaterial
            color="#ffffff"
            size={0.06}
            transparent
            opacity={0.3}
            sizeAttenuation
            depthWrite={false}
          />
        </points>

        {/* Mid dual octahedron ring */}
        <group ref={midRef}>
          <mesh>
            <octahedronGeometry args={[1.9, 0]} />
            <meshBasicMaterial
              color="#dca5ab"
              wireframe
              transparent
              opacity={0.15}
              depthWrite={false}
            />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
            <octahedronGeometry args={[1.5, 0]} />
            <meshBasicMaterial
              color="#ffffff"
              wireframe
              transparent
              opacity={0.1}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* Inner core node */}
        <mesh ref={innerRef}>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
};
