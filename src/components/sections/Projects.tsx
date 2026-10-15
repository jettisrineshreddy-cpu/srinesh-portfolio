import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../../data/projects';
import type { Project } from '../../data/projects';
import { ProjectModal } from '../ui/ProjectModal';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

// Custom curated order focusing on the best projects
const SHOWCASE_ORDER = [
  'pubg-analytics',
  'medtrack-dv',
  'ecommerce-analytics',
  'hr-analytics',
  'robot-path-tracking',
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Map to get the projects in the curated order
  const displayProjects = SHOWCASE_ORDER.map(id => projectsData.find(p => p.id === id)).filter(Boolean) as Project[];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cleanups: (() => void)[] = [];
    const entries = document.querySelectorAll('.project-showcase');
    
    entries.forEach((entry) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: entry,
          start: 'top 80%',
        }
      });

      const visualWrapper = entry.querySelector('.project-showcase__visual-wrapper') as HTMLElement | null;
      
      tl.fromTo(entry.querySelector('.project-showcase__header'), 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(visualWrapper,
        { opacity: 0, scale: 0.97, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(entry.querySelector('.project-showcase__footer'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.6'
      );

      // Mouse parallax for image tracking
      if (visualWrapper) {
        const onMouseEnter = () => {
          const img = visualWrapper.querySelector('img') || visualWrapper.querySelector('.project-showcase__abstract');
          if (img) gsap.to(img, { scale: 1.05, duration: 0.6, ease: 'power2.out' });
        };

        const onMouseMove = (e: MouseEvent) => {
          const rect = visualWrapper.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          const img = visualWrapper.querySelector('img') || visualWrapper.querySelector('.project-showcase__abstract');
          
          if (img) {
            gsap.to(img, {
              x: x * 20,
              y: y * 20,
              duration: 1,
              ease: 'power2.out'
            });
          }
        };

        const onMouseLeave = () => {
          const img = visualWrapper.querySelector('img') || visualWrapper.querySelector('.project-showcase__abstract');
          if (img) {
            gsap.to(img, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power2.out'
            });
          }
        };

        visualWrapper.addEventListener('mouseenter', onMouseEnter);
        visualWrapper.addEventListener('mousemove', onMouseMove);
        visualWrapper.addEventListener('mouseleave', onMouseLeave);

        cleanups.push(() => {
          visualWrapper.removeEventListener('mouseenter', onMouseEnter);
          visualWrapper.removeEventListener('mousemove', onMouseMove);
          visualWrapper.removeEventListener('mouseleave', onMouseLeave);
        });
      }
    });

    return () => {
      cleanups.forEach(fn => fn());
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger && (t.trigger as Element).classList?.contains('project-showcase')) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section id="projects" className="projects section-padding" ref={containerRef}>
      <div className="content-wrapper">
        
        <div className="projects__intro">
          <span className="projects__label">SELECTED WORK</span>
          <h2 className="projects__intro-title">
            Things I've built,<br />
            analyzed, and explored.
          </h2>
        </div>

        <div className="projects__list">
          {displayProjects.map((project, index) => {
            const num = String(index + 1).padStart(2, '0');
            const hasImage = project.images && project.images.length > 0;
            
            return (
              <div key={project.id} className="project-showcase">
                
                {/* Header: Title & Meta */}
                <div className="project-showcase__header">
                  <div className="project-showcase__meta">
                    <span className="project-showcase__num">{num}</span>
                    <span className="project-showcase__domain">{project.domain}</span>
                    <span className="project-showcase__year">2025</span>
                  </div>
                  <h3 className="project-showcase__title">{project.title}</h3>
                  <p className="project-showcase__summary">{project.summary}</p>
                  {project.knownKPIs && project.knownKPIs.length > 0 && (
                    <div className="project-showcase__kpis">
                      {project.knownKPIs.slice(0, 3).map((kpi) => (
                        <span key={kpi} className="project-showcase__kpi-badge">
                          {kpi}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Visual: Massive image area */}
                <div 
                  className="project-showcase__visual-wrapper project-card"
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if(e.key === 'Enter') setSelectedProject(project) }}
                  aria-label={`View case study for ${project.title}`}
                >
                  <div className="project-showcase__visual">
                    {hasImage ? (
                      <img src={project.images![0]} alt={project.title} loading="lazy" />
                    ) : project.id === 'robot-path-tracking' ? (
                      <div className="project-showcase__robot-schematic">
                        <svg viewBox="0 0 800 450" className="robot-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="robotGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#e32636" stopOpacity="0.8" />
                              <stop offset="100%" stopColor="#800f24" stopOpacity="0.2" />
                            </linearGradient>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                          {/* Reference Path */}
                          <path d="M 100 350 C 250 350, 200 150, 400 150 C 600 150, 550 300, 720 200" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="6 6" />
                          {/* Tracked Trajectory with Stanley/Pure Pursuit */}
                          <path d="M 100 365 C 240 340, 210 160, 400 155 C 590 150, 545 290, 715 205" stroke="url(#robotGlow)" strokeWidth="3" />
                          {/* Waypoint Nodes */}
                          <circle cx="100" cy="350" r="4" fill="#e32636" />
                          <circle cx="400" cy="150" r="5" fill="#e32636" />
                          <circle cx="720" cy="200" r="4" fill="#e32636" />
                          {/* Robot Model Marker */}
                          <g transform="translate(400, 155) rotate(-10)">
                            <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#090708" stroke="#e32636" strokeWidth="2" />
                            <circle cx="0" cy="0" r="3" fill="#ffffff" />
                            <line x1="0" y1="0" x2="30" y2="0" stroke="#e32636" strokeWidth="1.5" strokeDasharray="2 2" />
                            <text x="25" y="-18" fill="rgba(255,255,255,0.7)" fontFamily="monospace" fontSize="11">STANLEY CONTROLLER e(t) &rarr; 0</text>
                          </g>
                          <text x="40" y="60" fill="rgba(255,255,255,0.5)" fontFamily="monospace" fontSize="12">MATLAB / SIMULINK CONTROLLER SIMULATION</text>
                          <text x="40" y="85" fill="#e32636" fontFamily="monospace" fontSize="10">TRACKING ERROR: &lt; 0.04m | PURE PURSUIT &amp; STANLEY</text>
                        </svg>
                      </div>
                    ) : (
                      <div className="project-showcase__abstract">
                        <span className="abstract-text">{project.domain}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer: Tech & Button */}
                <div className="project-showcase__footer">
                  <p className="project-showcase__tech">
                    {project.technologies.slice(0, 4).join(' · ').toUpperCase()}
                  </p>
                  <button 
                    className="project-showcase__btn"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`View case study for ${project.title}`}
                  >
                    VIEW CASE STUDY &rarr;
                  </button>
                </div>
                
                <div className="project-showcase__divider" />
              </div>
            );
          })}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

