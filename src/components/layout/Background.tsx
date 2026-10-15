import React, { useEffect, useState } from 'react';
import './Background.css';

export const Background: React.FC = () => {
  const [scrollFactor, setScrollFactor] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          setScrollFactor(max > 0 ? window.scrollY / max : 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="background" aria-hidden="true">
      <div className="background__base" />
      <div 
        className="background__glow--crimson"
        style={{ transform: `translate(${-25 + scrollFactor * 15}%, ${-15 + scrollFactor * 25}%)` }}
      />
      <div 
        className="background__glow--ruby"
        style={{ transform: `translate(${20 - scrollFactor * 20}%, ${-scrollFactor * 30}%)` }}
      />
      <div 
        className="background__glow--burgundy"
        style={{ opacity: 0.6 + scrollFactor * 0.4 }}
      />
      <div 
        className="background__glow--scarlet"
        style={{ opacity: Math.max(0, 1 - scrollFactor * 2.5) }}
      />
      <div className="background__texture" />
    </div>
  );
};
