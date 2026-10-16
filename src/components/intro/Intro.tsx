import React, { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import './Intro.css';

interface IntroProps {
  onComplete: () => void;
}

/**
 * Subtle, ultra-clean 1.5s editorial intro:
 * - Pure typographic elegance (no heavy 3D, no particle clutter, no loud VFX)
 * - Quick refined mask reveal of JSR monogram and full name
 * - Effortlessly dissolves directly into the Hero
 */
export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [visible, setVisible] = useState(true);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('introSeen', 'true');
    setVisible(false);
    onComplete();
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.kill();
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut',
        onComplete: handleComplete,
      });
    } else {
      handleComplete();
    }
  }, [handleComplete]);

  useEffect(() => {
    // Session gating
    if (sessionStorage.getItem('introSeen') === 'true') {
      handleComplete();
      return;
    }

    // Reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: handleComplete,
    });
    tlRef.current = tl;

    // Fast, crisp editorial sequence (total ~1.5s)
    tl.fromTo(
      '.intro__monogram',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
    )
    .fromTo(
      '.intro__title-line',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
      '-=0.15'
    )
    .fromTo(
      '.intro__tagline',
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' },
      '-=0.2'
    )
    // Smooth dissolve into the hero
    .to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
      },
      '+=0.3'
    );

    return () => {
      tl.kill();
    };
  }, [handleComplete]);

  if (!visible) return null;

  return (
    <div className="intro" ref={overlayRef}>
      <div className="intro__inner">
        <span className="intro__monogram">JSR &mdash; 2025</span>
        <h1 className="intro__name">
          <span className="intro__title-line">JETTI SRINESH REDDY</span>
        </h1>
        <p className="intro__tagline">AI &times; DATA &times; ENGINEERING</p>
      </div>

      <button className="intro__skip" onClick={handleSkip} aria-label="Skip Intro">
        SKIP &rarr;
      </button>
    </div>
  );
};
