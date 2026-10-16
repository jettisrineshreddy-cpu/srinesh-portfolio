import React, { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import './Intro.css';

interface IntroProps {
  onComplete: () => void;
}

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
    // Quick fade out
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
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

    // Stage 1: Awakening — glow + sweep
    tl.to('.intro__glow', {
      opacity: 1,
      duration: 1.0,
      ease: 'power2.out',
    })
    .to('.intro__sweep', {
      left: '100%',
      duration: 1.8,
      ease: 'power1.inOut',
    }, 0)
    .to('.intro__progress-label', {
      opacity: 1,
      duration: 0.4,
    }, 0.3)
    .to('.intro__progress-fill', {
      width: '100%',
      duration: 4.2,
      ease: 'power1.inOut',
    }, 0)

    // Stage 2: Initials reveal (JSR)
    .to('.intro__initials', {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'power3.out',
    }, 0.8)

    // Stage 3: Initials shrink + full name reveal
    .to('.intro__initials', {
      scale: 0.6,
      opacity: 0.25,
      duration: 0.6,
      ease: 'power2.inOut',
    }, 2.0)
    .to('.intro__name-inner', {
      opacity: 1,
      y: '0%',
      duration: 0.8,
      ease: 'power4.out',
    }, 2.2)

    // Stage 4: Statement
    .to('.intro__statement', {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, 2.9)

    // Final: Fade everything out seamlessly into homepage
    .to(overlayRef.current, {
      opacity: 0,
      scale: 1.02,
      duration: 0.65,
      ease: 'power2.inOut',
    }, 3.8);

    return () => {
      tl.kill();
    };
  }, [handleComplete]);

  if (!visible) return null;

  return (
    <div className="intro" ref={overlayRef}>
      <div className="intro__bg">
        <div className="intro__glow" />
        <div className="intro__sweep" />
        <div className="intro__grain" />
      </div>

      <div className="intro__content">
        <div className="intro__initials" style={{ scale: 0.95 }}>JSR</div>
        <div className="intro__name">
          <span className="intro__name-inner">JETTI SRINESH REDDY</span>
        </div>
        <div className="intro__statement">AI &times; DATA &times; ENGINEERING</div>
      </div>

      <div className="intro__progress">
        <span className="intro__progress-label">LOADING PORTFOLIO</span>
        <div className="intro__progress-line">
          <div className="intro__progress-fill" />
        </div>
      </div>

      <button className="intro__skip" onClick={handleSkip}>
        SKIP INTRO
      </button>
    </div>
  );
};
