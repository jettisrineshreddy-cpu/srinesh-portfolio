import React, { useEffect } from 'react';
import type { Experience } from '../../data/experience';
import { profileData } from '../../data/profile';
import { LinkedinIcon } from '../ui/Icons';
import './ExperienceModal.css';

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience, onClose }) => {
  useEffect(() => {
    if (experience) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        document.body.classList.remove('modal-open');
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [experience, onClose]);

  if (!experience) return null;

  return (
    <div
      className={`exp-modal ${experience ? 'is-open' : ''}`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="exp-modal-title"
    >
      <div className="exp-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="exp-modal__nav">
          <button
            className="exp-modal__close"
            onClick={onClose}
            aria-label="Close experience details"
          >
            CLOSE &times;
          </button>
        </div>

        <div className="exp-modal__header">
          <div className="exp-modal__meta-row">
            <span className="exp-modal__type">{experience.type}</span>
            <span className="exp-modal__period">{experience.period}</span>
          </div>
          <h2 id="exp-modal-title" className="exp-modal__title">{experience.role}</h2>
          <p className="exp-modal__org">{experience.organization}</p>
        </div>

        <div className="exp-modal__body">
          <div className="exp-modal__main">
            <div className="exp-modal__section">
              <h3>OVERVIEW</h3>
              <p>{experience.description}</p>
            </div>

            {experience.projects && experience.projects.length > 0 && (
              <div className="exp-modal__section">
                <h3>KEY WORK & PROJECTS</h3>
                <ul className="exp-modal__list">
                  {experience.projects.map((proj, i) => (
                    <li key={i}>{proj}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="exp-modal__side">
            <div className="exp-modal__section">
              <h3>TECHNOLOGIES & FOCUS</h3>
              <div className="exp-modal__tech-stack">
                {experience.technologies.map((tech) => (
                  <span key={tech} className="exp-modal__tech-item">{tech}</span>
                ))}
              </div>
            </div>

            <div className="exp-modal__section">
              <h3>VERIFICATION</h3>
              <div className="exp-modal__links">
                <a
                  href={profileData.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="exp-modal__link-btn"
                >
                  <LinkedinIcon size={16} /> VIEW ON LINKEDIN
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
