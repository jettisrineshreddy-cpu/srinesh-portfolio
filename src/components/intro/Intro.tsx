import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { IntroScene } from './IntroScene';
import type { IntroSceneHandle } from './IntroScene';
import './Intro.css';

interface IntroProps {
  onComplete: () => void;
}

/**
 * Cinematic intro overlay with Three.js particle effects
 * and CSS typography matching the "TRUTH" reference style.
 *
 * Timeline (~5s):
 *   0.0–0.8s  Darkness → crimson haze + particles fade in
 *   0.8–2.2s  "JSR" ignites with glow + light sweep
 *   2.2–3.5s  JSR dissolves → "JETTI SRINESH REDDY" + subline
 *   3.5–5.0s  Hold briefly → full dissolve → onComplete
 */
export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<IntroSceneHandle>(null);
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

    // Small delay for React to mount the Canvas
    const mountDelay = setTimeout(() => {
      const scene = sceneRef.current;

      const tl = gsap.timeline({
        onComplete: handleComplete,
      });
      tlRef.current = tl;

      // Proxy objects for Three.js imperative controls
      const hazeProxy = { value: 0 };
      const particlesProxy = { value: 0 };
      const sweepProxy = { value: -10 };

      // ── STAGE 1: Darkness → Haze + Particles (0.0–0.8s) ──

      // Fade in crimson haze
      tl.to(hazeProxy, {
        value: 0.9,
        duration: 1.0,
        ease: 'power2.out',
        onUpdate: () => scene?.setHazeOpacity(hazeProxy.value),
      }, 0)

      // Fade in particles
      .to(particlesProxy, {
        value: 0.65,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => scene?.setParticlesOpacity(particlesProxy.value),
      }, 0.3)

      // Progress bar fills over entire duration
      .to('.intro-overlay__progress-fill', {
        width: '100%',
        duration: 6.0,
        ease: 'power1.inOut',
      }, 0)

      // Progress label appears
      .to('.intro-overlay__progress-label', {
        opacity: 1,
        duration: 0.4,
      }, 0.2)

      // ── STAGE 2: JSR Ignites (0.8–2.2s) ──

      // ── STAGE 2: JSR Ignites (0.8–2.2s) ──

      // Light sweep moves across JSR
      .to(sweepProxy, {
        value: 10,
        duration: 2.0,
        ease: 'power1.inOut',
        onUpdate: () => scene?.setSweepX(sweepProxy.value),
      }, 0.5)

      // JSR text ignites with scale animation
      .fromTo('.intro-title--jsr',
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.8
      )

      // Intensification of glow on JSR reveal
      .to(hazeProxy, {
        value: 1.2,
        duration: 0.4,
        ease: 'power2.out',
        onUpdate: () => scene?.setHazeOpacity(Math.min(hazeProxy.value, 1)),
      }, 1.0)
      .to(hazeProxy, {
        value: 0.7,
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate: () => scene?.setHazeOpacity(hazeProxy.value),
      }, 1.4)

      // ── STAGE 3: JSR → PORTFOLIO (2.1–3.7s) ──

      // JSR dissolves
      .to('.intro-title--jsr', {
        scale: 1.05,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      }, 2.0)

      // Second light sweep moves across PORTFOLIO
      .fromTo(sweepProxy,
        { value: -10 },
        {
          value: 10,
          duration: 1.8,
          ease: 'power1.inOut',
          onUpdate: () => scene?.setSweepX(sweepProxy.value),
        },
        2.2
      )

      // PORTFOLIO ignites in the EXACT SAME WAY as JSR
      .fromTo('.intro-title--portfolio',
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        2.3
      )

      // Same intensification of glow on PORTFOLIO reveal
      .to(hazeProxy, {
        value: 1.2,
        duration: 0.4,
        ease: 'power2.out',
        onUpdate: () => scene?.setHazeOpacity(Math.min(hazeProxy.value, 1)),
      }, 2.5)
      .to(hazeProxy, {
        value: 0.7,
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate: () => scene?.setHazeOpacity(hazeProxy.value),
      }, 2.9)

      // ── STAGE 4: PORTFOLIO → Full Name (3.7–5.5s) ──

      // PORTFOLIO dissolves
      .to('.intro-title--portfolio', {
        scale: 1.05,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      }, 3.6)

      // Third light sweep moves across full name
      .fromTo(sweepProxy,
        { value: -10 },
        {
          value: 10,
          duration: 1.8,
          ease: 'power1.inOut',
          onUpdate: () => scene?.setSweepX(sweepProxy.value),
        },
        3.8
      )

      // Full name ignites in the exact same glowing style
      .fromTo('.intro-title--fullname',
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        3.9
      )

      // Subline text
      .to('.intro-overlay__subline', {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, 4.4)

      // Particles intensify for the full name
      .to(particlesProxy, {
        value: 0.85,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => scene?.setParticlesOpacity(particlesProxy.value),
      }, 4.0)

      // ── STAGE 5: Hold + Dissolve (5.5–6.5s) ──

      // Start fading particles + haze
      .to(particlesProxy, {
        value: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onUpdate: () => scene?.setParticlesOpacity(particlesProxy.value),
      }, 5.5)
      .to(hazeProxy, {
        value: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onUpdate: () => scene?.setHazeOpacity(hazeProxy.value),
      }, 5.5)

      // Final overlay dissolve
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      }, 5.7);
    }, 100);

    return () => {
      clearTimeout(mountDelay);
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [handleComplete]);

  if (!visible) return null;

  return (
    <div className="intro-overlay" ref={overlayRef}>
      {/* Three.js Canvas — behind everything */}
      <div className="intro-overlay__canvas">
        <Canvas
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.5]}
          style={{ width: '100%', height: '100%' }}
        >
          <IntroScene ref={sceneRef} />
        </Canvas>
      </div>

      {/* Film grain */}
      <div className="intro-overlay__grain" />

      {/* Typography content */}
      <div className="intro-overlay__content">
        <div className="intro-overlay__title-wrapper">
          <h1
            className="intro-title intro-title--jsr"
            data-text="JSR"
          >
            JSR
          </h1>

          <h1
            className="intro-title intro-title--portfolio"
            data-text="PORTFOLIO"
          >
            PORTFOLIO
          </h1>

          <div className="intro-fullname-group">
            <h1
              className="intro-title intro-title--fullname"
              data-text="JETTI SRINESH REDDY"
            >
              JETTI SRINESH REDDY
            </h1>
            <div className="intro-overlay__subline">
              AI &times; DATA &times; ENGINEERING
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="intro-overlay__progress">
        <span className="intro-overlay__progress-label">LOADING</span>
        <div className="intro-overlay__progress-track">
          <div className="intro-overlay__progress-fill" />
        </div>
      </div>

      {/* Skip button */}
      <button
        className="intro-overlay__skip"
        onClick={handleSkip}
        aria-label="Skip Intro"
      >
        SKIP &rarr;
      </button>
    </div>
  );
};
