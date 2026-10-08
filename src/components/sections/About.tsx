import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profileData } from '../../data/profile';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!containerRef.current) return;

    if (!reduced) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });

      tl.fromTo('.about__label',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        .fromTo('.about__statement-line',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
          '-=0.2')
        .fromTo('.about__body-text',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.5')
        // Photo: clip-path reveal from bottom
        .fromTo('.about__photo-frame',
          { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
          { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.0, ease: 'power4.out' },
          '-=0.6')
        .fromTo('.about__photo-tag',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.2')
        .fromTo('.about__meta-item',
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          '-=0.6');
    }

    // Desktop-only: subtle GSAP parallax on photo hover
    const frame = photoRef.current;
    const img = photoImgRef.current;
    if (!frame || !img || reduced) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const onEnter = () => {
      gsap.to(img, { scale: 1.04, duration: 0.6, ease: 'power2.out' });
    };
    const onMove = (e: MouseEvent) => {
      const rect = frame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(img, { x: x * 10, y: y * 10, duration: 0.8, ease: 'power2.out' });
    };
    const onLeave = () => {
      gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' });
    };

    frame.addEventListener('mouseenter', onEnter);
    frame.addEventListener('mousemove', onMove);
    frame.addEventListener('mouseleave', onLeave);

    return () => {
      frame.removeEventListener('mouseenter', onEnter);
      frame.removeEventListener('mousemove', onMove);
      frame.removeEventListener('mouseleave', onLeave);
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section id="about" className="about section-padding" ref={containerRef}>
      <div className="content-wrapper">

        {/* TOP ROW: Label + Statement */}
        <div className="about__top-grid">
          <div className="about__top-left">
            <span className="about__label">ABOUT &mdash; J. SRINESH</span>
            <h2 className="about__statement">
              <div className="about__statement-mask">
                <span className="about__statement-line">Building intelligent systems</span>
              </div>
              <div className="about__statement-mask">
                <span className="about__statement-line">from data, models, and ideas.</span>
              </div>
            </h2>
          </div>

          {/* TOP RIGHT: Photo */}
          <div className="about__top-right">
            <div className="about__photo-frame" ref={photoRef}>
              <img
                ref={photoImgRef}
                src="/profile.png"
                alt="J. Srinesh"
                className="about__photo-img"
                loading="eager"
                decoding="async"
              />
              <div className="about__photo-tag">
                <span className="about__photo-tag-name">J. SRINESH</span>
                <span className="about__photo-tag-role">AI · DATA · ENGINEERING</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Bio + Metadata */}
        <div className="about__bottom-grid">
          <div className="about__bottom-left">
            <p className="about__body-text">
              I am a {profileData.status} interested in the practical application of technology. {profileData.careerDirection}
            </p>
            <p className="about__body-text">
              {profileData.supportingStatement}
            </p>
          </div>

          <div className="about__bottom-right">
            <div className="about__metadata">
              <div className="about__meta-item">
                <span className="about__meta-key">EDUCATION</span>
                <span className="about__meta-value">{profileData.degree}</span>
              </div>
              <div className="about__meta-item">
                <span className="about__meta-key">UNIVERSITY</span>
                <span className="about__meta-value">{profileData.university}</span>
              </div>
              <div className="about__meta-item">
                <span className="about__meta-key">PERIOD</span>
                <span className="about__meta-value">{profileData.duration}</span>
              </div>
              <div className="about__meta-item">
                <span className="about__meta-key">FOCUS</span>
                <span className="about__meta-value">AI / DATA / ENGINEERING</span>
              </div>
              <div className="about__meta-item">
                <span className="about__meta-key">LOCATION</span>
                <span className="about__meta-value">INDIA</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
