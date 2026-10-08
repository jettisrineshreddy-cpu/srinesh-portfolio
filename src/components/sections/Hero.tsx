import React from 'react';
import { Button } from '../ui/Button';
import { profileData } from '../../data/profile';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero__container">
        
        <div className="hero__status">
          <div className="status-indicator" />
          <span>Open to opportunities &mdash; 2024–2028</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">J. SRINESH</span>
          <span className="hero__subtitle">AI &times; DATA &times; ENGINEERING</span>
        </h1>
        
        <p className="hero__statement">
          Building data-driven systems, analytics solutions,<br className="hero__br" />
          and intelligent applications from first principles.
        </p>

        <div className="hero__actions">
          <Button variant="primary" href="#projects">
            VIEW WORK
          </Button>
          <Button
            variant="outline"
            href={profileData.links.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            RESUME &rarr;
          </Button>
        </div>
        
      </div>

      {/* Scroll indicator — vertical text on the right */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <span>SCROLL</span>
        <div className="hero__line" />
      </div>

      {/* Bottom-right index metadata */}
      <div className="hero__meta" aria-hidden="true">
        <span>INDIA</span>
        <span>B.TECH AI</span>
        <span>2024 – 2028</span>
      </div>
    </section>
  );
};
