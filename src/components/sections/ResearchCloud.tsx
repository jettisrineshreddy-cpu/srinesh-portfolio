import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profileData } from '../../data/profile';
import './ResearchCloud.css';

gsap.registerPlugin(ScrollTrigger);

// Stats for at-a-glance impact
const STATS = [
  { value: '4.4M', label: 'Records Processed' },
  { value: '5+', label: 'Projects Delivered' },
  { value: '3', label: 'Internships Completed' },
  { value: 'B.Tech', label: 'AI / 2024 – 2028' },
];

export const ResearchCloud: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo('.focus-stat',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }
    )
    .fromTo('.focus-panel',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15 },
      '-=0.3'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section id="research" className="research-cloud section-padding" ref={sectionRef}>
      <div className="content-wrapper">
        <div className="section-header">
          <h2 className="section-title">CURRENT FOCUS</h2>
          <div className="section-line"></div>
        </div>

        {/* At-a-glance stats */}
        <div className="focus-stats">
          {STATS.map((stat) => (
            <div key={stat.label} className="focus-stat">
              <span className="focus-stat__value">{stat.value}</span>
              <span className="focus-stat__label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Two focus panels */}
        <div className="focus-panels">
          <div className="focus-panel">
            <div className="focus-panel__tag">CLOUD &amp; DATA</div>
            <h3 className="focus-panel__heading">Cloud &amp; Data Engineering</h3>
            <p className="focus-panel__note">{profileData.cloudLearning.note}</p>
            <ul className="focus-panel__tech-list">
              {profileData.cloudLearning.technologies.map((tech) => (
                <li key={tech} className="focus-panel__tech-item">{tech}</li>
              ))}
            </ul>
          </div>

          <div className="focus-panel__divider" aria-hidden="true" />

          <div className="focus-panel">
            <div className="focus-panel__tag">RESEARCH</div>
            <h3 className="focus-panel__heading">Research &amp; Scientific Computing</h3>
            <p className="focus-panel__note">{profileData.research.note}</p>
            <ul className="focus-panel__tech-list">
              {profileData.research.areas.map((area) => (
                <li key={area} className="focus-panel__tech-item">{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
