import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profileData } from '../../data/profile';
import { AboutVisual } from './AboutVisual';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo('.about__label', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .fromTo('.about__statement-line', { opacity: 0, y: 40, rotateX: -15 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.2')
      .fromTo('.about__meta-item', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.6')
      .fromTo('.about__body-text', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .fromTo('.about__visual-container', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4');

    return () => {
      ScrollTrigger.getAll().forEach(t => t.trigger === containerRef.current && t.kill());
    };
  }, []);

  return (
    <section id="about" className="about section-padding" ref={containerRef}>
      <div className="content-wrapper">
        
        <div className="about__top-grid">
          <div className="about__top-left">
            <span className="about__label">ABOUT &mdash; J. SRINESH</span>
            <h2 className="about__statement">
              <div className="about__statement-mask"><span className="about__statement-line">Building intelligent systems</span></div>
              <div className="about__statement-mask"><span className="about__statement-line">from data, models, and ideas.</span></div>
            </h2>
          </div>
          
          <div className="about__top-right">
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
            <div className="about__visual-container">
              <AboutVisual />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
