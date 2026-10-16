import React, { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import './Intro.css';

interface IntroProps {
  onComplete: () => void;
}

interface Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  glow: number;
  vx: number;
  vy: number;
  streakLen: number;
}

/**
 * STYLE A (EUSION) PARTICLE INTRO
 * Pure visual recreation of Reference Image 1:
 * - Pure pitch black background (#000000)
 * - Typography rasterized into hundreds of glowing red-orange embers
 * - Horizontal laser filament streaks extending from the edges of the letterforms
 * - Sparks floating and breaking off the letters
 * - Crisp, fast sequence: JSR monogram -> JETTI SRINESH REDDY -> Smooth dissolve
 */
export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);
  const animFrameRef = useRef<number | null>(null);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('introSeen', 'true');
    setVisible(false);
    onComplete();
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (containerRef.current) {
      gsap.to(containerRef.current, {
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

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleComplete();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Color palette strictly from Style A (EUSION Image 1)
    const emberPalette = [
      '#ff3b00', // vibrant neon orange-red
      '#ff5500', // fiery orange
      '#ff1e00', // deep red-orange
      '#e32636', // ruby scarlet
      '#ffaa44', // hot core ember
      '#ffd4a3', // white-hot speck
    ];

    /**
     * Samples points from offscreen text rendering
     */
    const sampleTextParticles = (
      text: string,
      fontSize: number,
      yOffset: number = 0,
      subtext?: string
    ): Particle[] => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return [];

      offCtx.fillStyle = '#000000';
      offCtx.fillRect(0, 0, width, height);

      // Render main text
      offCtx.font = `800 ${fontSize}px "Space Grotesk", "Inter", sans-serif`;
      offCtx.fillStyle = '#ffffff';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.letterSpacing = '0.04em';
      offCtx.fillText(text, width / 2, height / 2 + yOffset);

      // Render secondary subtext if provided
      if (subtext) {
        offCtx.font = `600 ${Math.max(12, Math.floor(fontSize * 0.22))}px "JetBrains Mono", monospace`;
        offCtx.letterSpacing = '0.24em';
        offCtx.fillText(subtext, width / 2, height / 2 + yOffset + fontSize * 0.72);
      }

      // Sample pixels
      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;
      const particles: Particle[] = [];

      // Density step: responsive to screen size
      const step = width < 768 ? 4 : 5;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          const brightness = data[idx]; // R channel

          if (brightness > 120) {
            // Embers jitter slightly around true letterform
            const jitterX = (Math.random() - 0.5) * 2;
            const jitterY = (Math.random() - 0.5) * 2;
            const randColor = emberPalette[Math.floor(Math.random() * emberPalette.length)];

            // Chance of horizontal streak filament (Key feature in Image 1)
            const hasStreak = Math.random() > 0.82;
            const streakLen = hasStreak ? Math.random() * 45 + 15 : 0;

            particles.push({
              originX: x + jitterX,
              originY: y + jitterY,
              x: x + jitterX + (Math.random() - 0.5) * 60, // start slightly scattered
              y: y + jitterY + (Math.random() - 0.5) * 30,
              size: Math.random() * 2.2 + 0.8,
              color: randColor,
              alpha: Math.random() * 0.4 + 0.6,
              glow: Math.random() * 12 + 4,
              vx: (Math.random() - 0.5) * 0.35,
              vy: (Math.random() - 0.5) * 0.25 - 0.1, // gentle float
              streakLen,
            });
          }
        }
      }

      return particles;
    };

    // State parameters animated via GSAP
    const state = {
      convergence: 0, // 0: scattered -> 1: snapped to letter form
      glowIntensity: 1,
      overallAlpha: 1,
      stage: 1, // 1: JSR -> 2: JETTI SRINESH REDDY
    };

    // Sample JSR monogram
    const jsrSize = Math.min(width * 0.28, 220);
    let currentParticles = sampleTextParticles('JSR', jsrSize, 0, 'AI × DATA × ENGINEERING');

    // Sample Full Name for Stage 2
    const nameSize = Math.min(width * 0.082, 85);

    // GSAP Timeline controlling the EUSION sequence (~3.2s total)
    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: handleComplete,
          });
        } else {
          handleComplete();
        }
      },
    });

    // 0s - 1.2s: JSR embers converge from darkness with laser streaks
    tl.to(state, {
      convergence: 1,
      duration: 0.9,
      ease: 'power3.out',
    })
    // 1.2s - 1.5s: Hold JSR + small energy pulse
    .to(state, {
      glowIntensity: 1.8,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut',
    })
    // 1.6s - 1.9s: JSR embers scatter outward
    .to(state, {
      convergence: 0,
      glowIntensity: 0.6,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        // Switch particle set to JETTI SRINESH REDDY
        state.stage = 2;
        currentParticles = sampleTextParticles(
          'JETTI SRINESH REDDY',
          nameSize,
          0,
          'AI • DATA • ENGINEERING'
        );
      },
    })
    // 1.9s - 2.8s: Full Name embers assemble razor-sharp
    .to(state, {
      convergence: 1,
      glowIntensity: 1.4,
      duration: 0.85,
      ease: 'power4.out',
    })
    // 2.8s - 3.2s: Fade out seamlessly into hero
    .to(state, {
      overallAlpha: 0,
      duration: 0.45,
      ease: 'power2.inOut',
    }, '+=0.3');

    // Render loop
    const render = () => {
      // Pure black canvas clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Additive blending for fiery red-orange glow like in Image 1
      ctx.globalCompositeOperation = 'lighter';

      const pCount = currentParticles.length;
      for (let i = 0; i < pCount; i++) {
        const p = currentParticles[i];

        // Interpolate between drifted position and target letterform pixel
        const targetX = p.originX;
        const targetY = p.originY;

        // Micro-drift
        p.x += p.vx * (1 - state.convergence * 0.7);
        p.y += p.vy * (1 - state.convergence * 0.7);

        // Lerp to target based on convergence
        const currentX = p.x + (targetX - p.x) * state.convergence;
        const currentY = p.y + (targetY - p.y) * state.convergence;

        const alpha = p.alpha * state.overallAlpha;
        if (alpha <= 0) continue;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.glow * state.glowIntensity;

        // Draw Ember Core
        ctx.beginPath();
        ctx.arc(currentX, currentY, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw Horizontal Laser Streak Filaments (Reference Image 1 signature trait)
        if (p.streakLen > 0 && state.convergence > 0.4) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = Math.min(p.size * 0.75, 1.2);
          ctx.shadowBlur = (p.glow + 4) * state.glowIntensity;

          // Extend laser streak left and right
          const streakWidth = p.streakLen * state.convergence;
          const dir = (i % 2 === 0 ? 1 : -1);

          ctx.beginPath();
          ctx.moveTo(currentX, currentY);
          ctx.lineTo(currentX + streakWidth * dir, currentY);
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', onResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      tl.kill();
    };
  }, [handleComplete]);

  if (!visible) return null;

  return (
    <div className="particle-intro" ref={containerRef}>
      <canvas ref={canvasRef} className="particle-intro__canvas" />
      <div className="particle-intro__vignette" />

      <button className="particle-intro__skip" onClick={handleSkip} aria-label="Skip Intro">
        SKIP &rarr;
      </button>
    </div>
  );
};
