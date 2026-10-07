import React from 'react';
import { Button } from '../ui/Button';
import { profileData } from '../../data/profile';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero__container">
        
        <div className="hero__status">
          <div className="status-indicator"></div>
          <span>Available for opportunities</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">J. SRINESH</span>
          <span className="hero__subtitle">AI &times; DATA &times; ENGINEERING</span>
        </h1>
        
        <p className="hero__statement">
          Building intelligent systems from data, models, and ideas.
        </p>

        <div className="hero__actions">
          <Button variant="primary" href="#projects">
            VIEW PROJECTS
          </Button>
          <Button
            variant="outline"
            href={profileData.links.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            DOWNLOAD RESUME
          </Button>
        </div>
        
      </div>
      
      {/* Scroll indicator */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__line"></div>
      </div>
    </section>
  );
};
