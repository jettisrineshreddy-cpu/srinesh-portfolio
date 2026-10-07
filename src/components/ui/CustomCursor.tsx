import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Fast GSAP quick setter for performance
    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth follow loop
    const ticker = gsap.ticker.add(() => {
      // Lerp for smooth trailing (0.15 is smoothness factor)
      const dt = 1.0 - Math.pow(1.0 - 0.25, gsap.ticker.deltaRatio());
      
      const currentX = gsap.getProperty(cursor, "x") as number || mouseX;
      const currentY = gsap.getProperty(cursor, "y") as number || mouseY;
      
      xSet(currentX + (mouseX - currentX) * dt);
      ySet(currentY + (mouseY - currentY) * dt);
    });

    window.addEventListener('mousemove', onMouseMove);

    // Hover logic
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Interactive elements (links, buttons)
      if (target.closest('a') || target.closest('button')) {
        cursor.classList.add('is-hovering');
      } 
      // Project cards
      else if (target.closest('.project-card')) {
        cursor.classList.add('is-viewing');
        if (cursorTextRef.current) cursorTextRef.current.innerText = 'VIEW';
      }
      else {
        cursor.classList.remove('is-hovering', 'is-viewing');
        if (cursorTextRef.current) cursorTextRef.current.innerText = '';
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      gsap.ticker.remove(ticker);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className="custom-cursor" ref={cursorRef}>
      <span className="custom-cursor__text" ref={cursorTextRef}></span>
    </div>
  );
};
