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
  const [stage, setStage] = useState<'jsr' | 'fullname'>('jsr');
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
        duration: 4.5,
        ease: 'power1.inOut',
      }, 0)

      // Progress label appears
      .to('.intro-overlay__progress-label', {
        opacity: 1,
        duration: 0.4,
      }, 0.2)

      // ── STAGE 2: JSR Ignites (0.8–2.2s) ──

      // Light sweep moves across
      .to(sweepProxy, {
        value: 10,
        duration: 2.0,
        ease: 'power1.inOut',
        onUpdate: () => scene?.setSweepX(sweepProxy.value),
      }, 0.5)

      // JSR text appears with scale animation
      .to('.intro-title--jsr', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      }, 0.8)

      // Brief intensification of glow
      .to(hazeProxy, {
        value: 1.2,
        duration: 0.4,
        ease: 'power2.out',
        onUpdate: () => scene?.setHazeOpacity(Math.min(hazeProxy.value, 1)),
      }, 1.2)
      .to(hazeProxy, {
        value: 0.7,
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate: () => scene?.setHazeOpacity(hazeProxy.value),
      }, 1.6)

      // ── STAGE 3: JSR → Full Name (2.2–3.5s) ──

      // JSR scales down and dissolves
      .to('.intro-title--jsr', {
        scale: 1.06,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => setStage('fullname'),
      }, 2.2)

      // Full name reveals
      .fromTo('.intro-title--fullname',
        { opacity: 0, scale: 0.93, filter: 'blur(5px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power4.out',
        },
        2.7
      )

      // Subline text
      .to('.intro-overlay__subline', {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, 3.0)

      // Particles intensify slightly for the full name
      .to(particlesProxy, {
        value: 0.85,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => scene?.setParticlesOpacity(particlesProxy.value),
      }, 2.7)

      // ── STAGE 4: Hold + Dissolve (3.5–5.0s) ──

      // Start fading particles + haze
      .to(particlesProxy, {
        value: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onUpdate: () => scene?.setParticlesOpacity(particlesProxy.value),
      }, 4.0)
      .to(hazeProxy, {
        value: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onUpdate: () => scene?.setHazeOpacity(hazeProxy.value),
      }, 4.0)

      // Final overlay dissolve
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      }, 4.2);
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
          {stage === 'jsr' ? (
            <h1
              className="intro-title intro-title--jsr"
              data-text="JSR"
            >
              JSR
            </h1>
          ) : (
            <>
              <h1
                className="intro-title intro-title--fullname"
                data-text="JETTI SRINESH REDDY"
              >
                JETTI SRINESH REDDY
              </h1>
              <div className="intro-overlay__subline">
                AI &times; DATA &times; ENGINEERING
              </div>
            </>
          )}
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
