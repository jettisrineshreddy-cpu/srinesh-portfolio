import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { Intro3DScene } from './IntroScene';
import type { Intro3DSceneHandle } from './IntroScene';
import fontJson from '../../../public/fonts/helvetiker_bold.typeface.json';
import './Intro.css';

interface IntroProps {
  onComplete: () => void;
}

/**
 * CINEMATIC HOLLYWOOD TITLE INTRO (Three.js 3D + R3F)
 * Exact 1:1 match to reference images:
 * - 0.0–0.5s: Pure darkness & crimson atmospheric haze emerges
 * - 0.5–1.8s: Searing crimson particles converge directly onto 3D dimensional JSR lettering
 * - 1.8–3.5s: JSR fragments disperse as 3D metallic JETTI SRINESH REDDY reveals with specular light sweep
 * - 3.5–4.3s: Supporting tagline "AI • DATA • ENGINEERING" locks into place
 * - 4.3–5.0s: Flawless cinematic dissolve into the existing homepage
 */
export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Intro3DSceneHandle>(null);
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
    // Session check
    if (sessionStorage.getItem('introSeen') === 'true') {
      handleComplete();
      return;
    }

    // Reduced motion accessibility
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleComplete();
      return;
    }

    // Allow canvas 1 tick to mount and setup WebGL context
    const mountTimer = setTimeout(() => {
      const scene = sceneRef.current;
      if (!scene) return;

      const tl = gsap.timeline({
        onComplete: handleComplete,
      });
      tlRef.current = tl;

      const animProxy = {
        progress: 0,
        sweepX: -10,
        hazeOpacity: 0,
      };

      // ─── 0.0s – 0.5s: Darkness & Volumetric Crimson Haze ────────────
      tl.to(animProxy, {
        hazeOpacity: 0.85,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => scene.setHazeOpacity(animProxy.hazeOpacity),
      }, 0)
      .to('.intro-overlay__progress-fill', {
        width: '100%',
        duration: 4.8,
        ease: 'none',
      }, 0)

      // ─── 0.5s – 1.8s: Particles Converge onto 3D JSR Lettering ──────
      .to(animProxy, {
        progress: 0.35,
        duration: 1.3,
        ease: 'power3.inOut',
        onUpdate: () => scene.setTimelineProgress(animProxy.progress),
      }, 0.5)

      // Light sweep #1 across JSR
      .fromTo(animProxy, 
        { sweepX: -8 },
        {
          sweepX: 8,
          duration: 1.2,
          ease: 'power1.inOut',
          onUpdate: () => scene.setSweepX(animProxy.sweepX),
        },
        0.7
      )

      // ─── 1.8s – 3.5s: JSR Disperses & Full 3D Metallic Name Reveals ─
      .to(animProxy, {
        progress: 0.72,
        duration: 1.7,
        ease: 'power3.inOut',
        onUpdate: () => scene.setTimelineProgress(animProxy.progress),
      }, 1.8)

      // Light sweep #2 across full metallic name
      .fromTo(animProxy,
        { sweepX: -10 },
        {
          sweepX: 10,
          duration: 1.6,
          ease: 'power1.inOut',
          onUpdate: () => scene.setSweepX(animProxy.sweepX),
        },
        2.2
      )

      // Haze pulse to illuminate name reveal
      .to(animProxy, {
        hazeOpacity: 1.0,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: () => scene.setHazeOpacity(animProxy.hazeOpacity),
      }, 2.3)
      .to(animProxy, {
        hazeOpacity: 0.75,
        duration: 0.6,
        ease: 'power2.inOut',
        onUpdate: () => scene.setHazeOpacity(animProxy.hazeOpacity),
      }, 2.8)

      // ─── 3.5s – 4.3s: Supporting Tagline Locks into Place ───────────
      .to(animProxy, {
        progress: 1.0,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => scene.setTimelineProgress(animProxy.progress),
      }, 3.5)

      // ─── 4.3s – 5.0s: Cinematic Dissolve to Reveal Homepage ─────────
      .to(animProxy, {
        hazeOpacity: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        onUpdate: () => scene.setHazeOpacity(animProxy.hazeOpacity),
      }, 4.3)
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.inOut',
      }, 4.3);

    }, 50);

    return () => {
      clearTimeout(mountTimer);
      if (tlRef.current) tlRef.current.kill();
    };
  }, [handleComplete]);

  if (!visible) return null;

  return (
    <div className="intro-overlay" ref={overlayRef}>
      {/* 3D WebGL Canvas Layer with Extruded Text & Converging Particle Embers */}
      <div className="intro-overlay__canvas">
        <Canvas
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          dpr={[1, 2]}
          style={{ width: '100vw', height: '100vh' }}
        >
          <Intro3DScene ref={sceneRef} fontData={fontJson} />
        </Canvas>
      </div>

      {/* Atmospheric Film Grain Overlay */}
      <div className="intro-overlay__grain" />

      {/* Cinematic Progress Line */}
      <div className="intro-overlay__progress">
        <div className="intro-overlay__progress-track">
          <div className="intro-overlay__progress-fill" />
        </div>
      </div>

      {/* Skip Button (Immediate Cancel & Homepage Reveal) */}
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
