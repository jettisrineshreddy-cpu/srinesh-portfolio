import React, { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import './Intro.css';

interface IntroProps {
  onComplete: () => void;
}

/**
 * STYLE B (TRUTH) CINEMATIC TITLE INTRO
 * Direct 1:1 recreation of Reference Image 2:
 * - Pure deep crimson-black atmospheric fog (#030102)
 * - Large distressed uppercase typography
 * - White-hot illuminated interior core (#fff2f4)
 * - Intense multi-stage ruby/scarlet edge glow
 * - Controlled cinematic sequence (~3.0s total):
 *   1. Red atmospheric haze emerges from darkness
 *   2. Searing "JSR" monogram ignites with incandescent bloom
 *   3. Sharp transition into "JETTI SRINESH REDDY"
 *   4. Clean dissolve directly into homepage
 */
export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
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
    if (sessionStorage.getItem('introSeen') === 'true') {
      handleComplete();
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: handleComplete,
    });
    tlRef.current = tl;

    // 0.0s – 0.6s: Crimson Haze & Backlight emerge from darkness
    tl.to('.truth-intro__haze', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    })
    .to('.truth-intro__backlight', {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, 0.2)

    // 0.5s – 1.4s: JSR Monogram Ignites with White-Hot Core
    .to('.truth-title--jsr', {
      opacity: 1,
      scale: 1.0,
      duration: 0.75,
      ease: 'power3.out',
    }, 0.4)

    // 1.5s – 1.8s: Quick bloom surge and swap to Full Name
    .to('.truth-title--jsr', {
      scale: 1.05,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setStage('fullname');
      },
    }, 1.5)

    // 1.85s – 2.8s: JETTI SRINESH REDDY strikes in with intense red bloom
    .fromTo('.truth-title--fullname', 
      { opacity: 0, scale: 0.94, filter: 'blur(6px)' },
      { opacity: 1, scale: 1.0, filter: 'blur(0px)', duration: 0.7, ease: 'power4.out' },
      1.85
    )
    .to('.truth-intro__subline', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, 2.1)

    // 2.9s – 3.4s: Cinematic dissolve into the homepage
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.55,
      ease: 'power2.inOut',
    }, 2.9);

    return () => {
      tl.kill();
    };
  }, [handleComplete]);

  if (!visible) return null;

  return (
    <div className="truth-intro" ref={overlayRef}>
      {/* Background Volumetric Crimson Haze & Lighting */}
      <div className="truth-intro__haze" />
      <div className="truth-intro__backlight" />
      <div className="truth-intro__grain" />

      {/* Main Searing Typographic Core */}
      <div className="truth-intro__content">
        <div className="truth-intro__title-wrapper">
          {stage === 'jsr' ? (
            <h1 className="truth-title truth-title--jsr" data-text="JSR">
              JSR
            </h1>
          ) : (
            <>
              <h1 className="truth-title truth-title--fullname" data-text="JETTI SRINESH REDDY">
                JETTI SRINESH REDDY
              </h1>
              <div className="truth-intro__subline">
                AI &times; DATA &times; ENGINEERING
              </div>
            </>
          )}
        </div>
      </div>

      {/* Skip Button */}
      <button className="truth-intro__skip" onClick={handleSkip} aria-label="Skip Intro">
        SKIP &rarr;
      </button>
    </div>
  );
};
