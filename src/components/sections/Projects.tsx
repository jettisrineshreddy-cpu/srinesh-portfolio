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
  'robot-path-tracking',
  'ecommerce-analytics',
  'hr-analytics'
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Map to get the projects in the curated order
  const displayProjects = SHOWCASE_ORDER.map(id => projectsData.find(p => p.id === id)).filter(Boolean) as Project[];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const entries = document.querySelectorAll('.project-showcase');
    
    entries.forEach((entry) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: entry,
          start: 'top 80%',
        }
      });

      tl.fromTo(entry.querySelector('.project-showcase__header'), 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(entry.querySelector('.project-showcase__visual-wrapper'),
        { opacity: 0, scale: 0.97, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(entry.querySelector('.project-showcase__footer'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.6'
      );
    });

    return () => {
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

