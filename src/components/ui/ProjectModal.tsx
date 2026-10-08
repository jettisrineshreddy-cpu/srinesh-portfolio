import React, { useEffect } from 'react';
import type { Project } from '../../data/projects';
import { GithubIcon } from './Icons';
import './ProjectModal.css';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      // Basic accessibility trap
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [project, onClose]);

  if (!project) return null;

  const hasLink = project.links.github !== '[ADD PROJECT LINKS]';

  return (
    <div className={`project-modal ${project ? 'is-open' : ''}`} onClick={onClose} aria-modal="true" role="dialog">
      <div className="project-modal__content" onClick={(e) => e.stopPropagation()}>
        
        <div className="project-modal__nav">
          <button className="project-modal__close" onClick={onClose} aria-label="Close project details">
            CLOSE &times;
          </button>
        </div>

        <div className="project-modal__header">
          <div className="project-modal__meta-row">
            <span className="project-modal__domain">{project.domain}</span>
            <span className="project-modal__year">2025</span>
          </div>
          <h2 className="project-modal__title">{project.title}</h2>
          <p className="project-modal__subtitle">{project.subtitle}</p>
        </div>

        <div className="project-modal__gallery">
          {project.images && project.images.length > 0 ? (
            project.images.map((img, i) => (
              <div key={i} className="project-modal__img-wrapper">
                <img src={img} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" />
              </div>
            ))
          ) : (
            <div className="project-modal__abstract-img">
              <span>{project.domain}</span>
            </div>
          )}
        </div>

        <div className="project-modal__body">
          <div className="project-modal__main">
            <div className="project-modal__section">
              <h3>OVERVIEW</h3>
              <p>{project.summary}</p>
            </div>

            {project.analyticalAreasOrComponents && project.analyticalAreasOrComponents.length > 0 && (
              <div className="project-modal__section">
                <h3>KEY COMPONENTS</h3>
                <ul className="project-modal__list">
                  {project.analyticalAreasOrComponents.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {project.knownKPIs && project.knownKPIs.length > 0 && (
              <div className="project-modal__section">
                <h3>METRICS & KPIs</h3>
                <ul className="project-modal__list">
                  {project.knownKPIs.map((kpi, i) => (
                    <li key={i}>{kpi}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="project-modal__side">
            <div className="project-modal__section">
              <h3>TECHNOLOGIES</h3>
              <div className="project-modal__tech-stack">
                {project.technologies.map(tech => (
                  <span key={tech} className="project-modal__tech-item">{tech}</span>
                ))}
              </div>
            </div>

            {hasLink && (
              <div className="project-modal__section">
                <h3>LINKS</h3>
                <div className="project-modal__links">
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-modal__link-btn">
                    <GithubIcon size={16} /> VIEW REPOSITORY
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
