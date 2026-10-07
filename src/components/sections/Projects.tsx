import React from 'react';
import { projectsData } from '../../data/projects';
import { Badge } from '../ui/Badge';
import { GithubIcon } from '../ui/Icons';
import { ExternalLink, Database } from 'lucide-react';
import { ProjectImage3D } from '../ui/ProjectImage3D';
import './Projects.css';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="projects section-padding">
      <div className="section-header">
        <h2 className="section-title">Project Universe</h2>
        <div className="section-line"></div>
      </div>

      <div className="projects__grid">
        {projectsData.map((project) => (
          <div 
            key={project.id} 
            className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
          >
            <div className="project-card__layout">
              <div className="project-card__content">
                <div className="project-card__header">
                  <p className="project-card__domain">{project.domain}</p>
                  <div className="project-card__links">
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                        <GithubIcon size={20} />
                      </a>
                    )}
                    {project.links.demo && (
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                
                <h3 className="project-card__title">{project.title}</h3>
                {project.subtitle && <h4 className="project-card__subtitle">{project.subtitle}</h4>}
                
                <p className="project-card__summary">{project.summary}</p>
                
                {project.datasetOrScope && (
                  <div className="project-card__scope">
                    <Database size={14} />
                    <span>{project.datasetOrScope}</span>
                  </div>
                )}

                <div className="project-card__areas">
                  <strong>Key Focus:</strong>
                  <ul>
                    {project.analyticalAreasOrComponents.slice(0, 4).map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                    {project.analyticalAreasOrComponents.length > 4 && (
                      <li>+{project.analyticalAreasOrComponents.length - 4} more</li>
                    )}
                  </ul>
                </div>

                {project.knownKPIs && (
                  <div className="project-card__kpis">
                    {project.knownKPIs.map((kpi, i) => (
                      <span key={i} className="kpi-tag">{kpi}</span>
                    ))}
                  </div>
                )}
              </div>

              {project.images && project.images.length > 0 && (
                <div className="project-card__visual">
                  <ProjectImage3D images={project.images} />
                </div>
              )}
            </div>

            <div className="project-card__tech">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant={project.featured ? "cyan" : "default"}>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
