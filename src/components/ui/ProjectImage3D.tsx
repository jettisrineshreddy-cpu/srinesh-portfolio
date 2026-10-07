import React, { useState, useRef, useEffect } from 'react';
import './ProjectImage3D.css';

interface ProjectImage3DProps {
  images: string[];
}

export const ProjectImage3D: React.FC<ProjectImage3DProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Cycle images if there are multiple
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-10deg to 10deg)
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    
    const rotateX = yPct * -20; // Up/down movement tilts on X axis
    const rotateY = xPct * 20;  // Left/right movement tilts on Y axis
    
    containerRef.current.style.setProperty('--rotateX', `${rotateX}deg`);
    containerRef.current.style.setProperty('--rotateY', `${rotateY}deg`);
    containerRef.current.style.setProperty('--mouseX', `${x}px`);
    containerRef.current.style.setProperty('--mouseY', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty('--rotateX', '0deg');
    containerRef.current.style.setProperty('--rotateY', '0deg');
    containerRef.current.style.setProperty('--mouseX', '-1000px');
    containerRef.current.style.setProperty('--mouseY', '-1000px');
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="project-image-3d-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-image-3d-wrapper">
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`Dashboard preview ${idx + 1}`}
            className={`project-image-3d-img ${idx === currentIndex ? 'active' : ''}`}
          />
        ))}
        {/* Glossy reflection effect */}
        <div className="project-image-3d-glare"></div>
      </div>
    </div>
  );
};
