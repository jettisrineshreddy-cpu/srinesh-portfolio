import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

interface ScrollRigProps {
  reducedMotion?: boolean;
}

export const ScrollRig: React.FC<ScrollRigProps> = ({ reducedMotion }) => {
  const { camera } = useThree();
  const targetZ = useRef(15);
  const targetY = useRef(0);
  const targetX = useRef(0);

  useFrame(() => {
    if (reducedMotion) return;

    // Calculate scroll progress (0 to 1)
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, scrollY / (maxScroll || 1)));

    // Define camera path based on scroll progress
    // Start at z=15, move forward into the particles, and slightly down
    targetZ.current = 15 - progress * 10;
    targetY.current = progress * 2;
    targetX.current = Math.sin(progress * Math.PI) * 2;

    // Smoothly interpolate camera position using GSAP-like ease or simple lerp
    camera.position.z += (targetZ.current - camera.position.z) * 0.05;
    camera.position.y += (targetY.current - camera.position.y) * 0.05;
    camera.position.x += (targetX.current - camera.position.x) * 0.05;
    
    // Add subtle parallax based on mouse position if we wanted to, but keeping it simple for now
    camera.lookAt(0, 0, 0);
  });

  return null;
};
