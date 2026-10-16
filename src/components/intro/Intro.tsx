import React, { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { CinematicIntroScene } from './CinematicIntroScene';
import './Intro.css';

interface IntroProps {
  onComplete: () => void;
}

type IntroPhase = 'darkness' | 'initials' | 'disintegration' | 'fullname' | 'identity' | 'transition';

/**
 * World-Class Hollywood-Style Intro Sequence for JETTI SRINESH REDDY
 * Seamlessly integrates Three.js R3F 3D lighting, metallic reflections,
 * custom volumetric particles, and GSAP timeline pacing.
 *
 * Pacing: ~5.0 seconds total, with instant SKIP support and zero audio autoplay.
 */
export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [phase, setPhase] = useState<IntroPhase>('darkness');
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
        scale: 1.05,
        duration: 0.35,
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

    // ─────────────────────────────────────────────────────────────
    // SCENE ONE: Darkness & Atmospheric Energy (0.0s – 1.0s)
    // ─────────────────────────────────────────────────────────────
    tl.to('.intro__glow', {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
    })
    .to('.intro__sweep', {
      left: '100%',
      duration: 1.8,
      ease: 'power2.inOut',
    }, 0.2)
    .to('.intro__progress-label', {
      opacity: 1,
      duration: 0.4,
    }, 0.2)
    .to('.intro__progress-fill', {
      width: '100%',
      duration: 5.0,
      ease: 'linear',
    }, 0)

    // ─────────────────────────────────────────────────────────────
    // SCENE TWO: Reveal JSR 3D Metallic Initials (1.0s – 2.2s)
    // ─────────────────────────────────────────────────────────────
    .call(() => setPhase('initials'), undefined, 0.9)
    .to('.intro__initials', {
      opacity: 1,
      scale: 1.0,
      duration: 1.1,
      ease: 'power3.out',
    }, 1.0)

    // ─────────────────────────────────────────────────────────────
    // SCENE THREE: Particle Disintegration & Convergence (2.2s – 2.9s)
    // ─────────────────────────────────────────────────────────────
    .call(() => setPhase('disintegration'), undefined, 2.2)
    .to('.intro__initials', {
      scale: 0.65,
      opacity: 0,
      filter: 'blur(12px)',
      duration: 0.7,
      ease: 'power2.in',
    }, 2.2)

    // ─────────────────────────────────────────────────────────────
    // SCENE FOUR: Reveal Full Name "JETTI SRINESH REDDY" (2.8s – 4.2s)
    // Reference 3 style: Distressed metallic with intense red-white illumination
    // ─────────────────────────────────────────────────────────────
    .call(() => setPhase('fullname'), undefined, 2.8)
    .to('.intro__name-inner', {
      opacity: 1,
      y: '0%',
      duration: 0.95,
      ease: 'power4.out',
    }, 2.85)

    // ─────────────────────────────────────────────────────────────
    // SCENE FIVE: Energy & Identity "AI × DATA × ENGINEERING" (3.6s – 4.5s)
    // ─────────────────────────────────────────────────────────────
    .call(() => setPhase('identity'), undefined, 3.6)
    .to('.intro__statement', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
    }, 3.6)

    // ─────────────────────────────────────────────────────────────
    // SCENE SIX: Hollywood Seamless Dissolve into Homepage (4.5s – 5.2s)
    // ─────────────────────────────────────────────────────────────
    .call(() => setPhase('transition'), undefined, 4.4)
    .to(overlayRef.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.75,
      ease: 'power2.inOut',
    }, 4.5);

    return () => {
      tl.kill();
    };
  }, [handleComplete]);

  if (!visible) return null;

  return (
    <div className="intro" ref={overlayRef}>
      {/* 3D WebGL Scene: Particle Embers, Horizontal Streaks & Metallic Architecture */}
      <CinematicIntroScene phase={phase} />

      {/* Atmospheric 2D background glow & laser sweeps */}
      <div className="intro__bg">
        <div className="intro__glow" />
        <div className="intro__sweep" />
        <div className="intro__grain" />
      </div>

      {/* Primary Cinematic Content */}
      <div className="intro__content">
        {/* Scene Two & Three: 3D JSR Initials */}
        <div className="intro__initials-wrapper">
          <div className="intro__initials">JSR</div>
        </div>

        {/* Scene Four: Distressed Metallic Full Name */}
        <div className="intro__name-container">
          <h1 className="intro__name" data-text="JETTI SRINESH REDDY">
            <span className="intro__name-inner">JETTI SRINESH REDDY</span>
          </h1>
        </div>

        {/* Scene Five: Identity */}
        <div className="intro__statement">
          <span>AI</span>
          <span className="intro__statement-bullet">&bull;</span>
          <span>DATA</span>
          <span className="intro__statement-bullet">&bull;</span>
          <span>ENGINEERING</span>
        </div>
      </div>

      {/* Progress & Verification Bar */}
      <div className="intro__progress">
        <span className="intro__progress-label">INITIALIZING SYSTEM</span>
        <div className="intro__progress-line">
          <div className="intro__progress-fill" />
        </div>
      </div>

      {/* Instant Skip Option */}
      <button className="intro__skip" onClick={handleSkip} aria-label="Skip Intro Animation">
        SKIP INTRO &rarr;
      </button>
    </div>
  );
};
