import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './AboutVisual.css';

// Abstract positions (0-100 percentages)
const NODES = [
  { id: 'data', label: 'DATA', x: 25, y: 25 },
  { id: 'ai', label: 'AI', x: 75, y: 20 },
  { id: 'sql', label: 'SQL', x: 50, y: 50 },
  { id: 'analytics', label: 'ANALYTICS', x: 20, y: 75 },
  { id: 'engineering', label: 'ENGINEERING', x: 80, y: 80 }
];

// Which nodes connect to which (indices)
const LINKS = [
  [0, 2], [1, 2], [2, 3], [2, 4], [0, 3], [1, 4]
];

export const AboutVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    
    // Subtle continuous breathing/rotation
    gsap.to(groupRef.current, {
      rotation: 1.5,
      scale: 1.03,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: '50% 50%'
    });
    
    // Interactive Parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      gsap.to(groupRef.current, {
        x: x * 15,
        y: y * 15,
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="about-visual" ref={containerRef} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="about-visual__svg">
        <g ref={groupRef}>
          {/* Connections */}
          {LINKS.map((link, i) => {
            const n1 = NODES[link[0]];
            const n2 = NODES[link[1]];
            return (
              <line 
                key={`link-${i}`} 
                x1={n1.x} y1={n1.y} 
                x2={n2.x} y2={n2.y} 
                className="about-visual__line" 
              />
            );
          })}
          
          {/* Nodes */}
          {NODES.map(node => (
            <g key={node.id} className="about-visual__node" transform={`translate(${node.x}, ${node.y})`}>
              <circle r="1.5" className="about-visual__dot" />
              <text x="3" y="1" className="about-visual__text">{node.label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};
