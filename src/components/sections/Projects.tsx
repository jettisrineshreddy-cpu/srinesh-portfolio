import React from 'react';
import { projectsData } from '../../data/projects';
import { ProjectImage3D } from '../ui/ProjectImage3D';
import { GithubIcon } from '../ui/Icons';
import './Projects.css';

const TOP_PROJECTS = ['pubg-analytics', 'medtrack-dv', 'ecommerce-analytics', 'hr-analytics'];
const OTHER_PROJECTS = ['python-cicd', 'robot-path-tracking'];

const YEAR = '2025';

export const Projects: React.FC = () => {
  const topProjects = projectsData.filter((p) => TOP_PROJECTS.includes(p.id));
  const otherProjects = projectsData.filter((p) => OTHER_PROJECTS.includes(p.id));

  return (
    <section id="projects" className="projects section-padding">
      <div className="content-wrapper">
        <div className="section-header">
          <h2 className="section-title">SELECTED WORK</h2>
          <div className="section-line"></div>
        </div>

        <div className="projects__list">
          {topProjects.map((project, i) => {
            const hasLink = project.links.github !== '[ADD PROJECT LINKS]';
            const num = String(i + 1).padStart(2, '0');

            return (
              <div key={project.id} className="project-entry">
                <div className="project-entry__header">
                  <span className="project-entry__num">{num}</span>
                  <div className="project-entry__meta-row">
                    <span className="project-entry__domain">{project.domain}</span>
                    <span className="project-entry__year">{YEAR}</span>
                  </div>
                </div>

                <div className="project-entry__body">
                  <h3 className="project-entry__title">{project.title}</h3>
                  <p className="project-entry__summary">{project.summary}</p>
                </div>

                {project.images && project.images.length > 0 && (
                  <div className="project-entry__visual">
                    <ProjectImage3D images={project.images} />
                  </div>
                )}

                <div className="project-entry__footer">
                  <div className="project-entry__tech">
                    {project.technologies.map((t) => (
                      <span key={t} className="project-entry__tag">{t}</span>
                    ))}
                  </div>
                  {hasLink ? (
                    <a
                      href={project.links.github}
                      className="project-entry__link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <GithubIcon size={14} /> VIEW ON GITHUB &rarr;
                    </a>
                  ) : (
                    <span className="project-entry__link project-entry__link--disabled">
                      LINK COMING SOON
                    </span>
                  )}
                </div>

                <div className="project-entry__divider" />
              </div>
            );
          })}
        </div>

        {/* Secondary projects */}
        <div className="projects__secondary">
          <h3 className="projects__secondary-heading">OTHER WORK</h3>
          <div className="projects__secondary-grid">
            {otherProjects.map((project, i) => {
              const hasLink = project.links.github !== '[ADD PROJECT LINKS]';
              return (
                <div key={project.id} className="project-other">
                  <span className="project-other__num">{String(TOP_PROJECTS.length + i + 1).padStart(2, '0')}</span>
                  <div className="project-other__content">
                    <h4 className="project-other__title">{project.title}</h4>
                    <p className="project-other__domain">{project.domain}</p>
                    <p className="project-other__tech">{project.technologies.join(', ')}</p>
                    {hasLink ? (
                      <a href={project.links.github} className="project-other__link" target="_blank" rel="noopener noreferrer">
                        GITHUB &rarr;
                      </a>
                    ) : (
                      <span className="project-other__link project-other__link--disabled">LINK COMING SOON</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
