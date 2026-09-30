import React from 'react';
import { ArrowDown, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { profileData } from '../../data/profile';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero__content">
        <p className="hero__greeting">Hello, I am</p>
        <h1 className="hero__title">{profileData.name}</h1>
        <h2 className="hero__subtitle">
          {profileData.degree}
        </h2>
        
        <div className="hero__tagline-wrapper">
          <p className="hero__tagline">{profileData.tagline}</p>
        </div>

        <p className="hero__statement">
          &ldquo;{profileData.supportingStatement}&rdquo;
        </p>

        <div className="hero__actions">
          <Button variant="primary" href="#projects">
            Explore Projects <ArrowDown size={18} />
          </Button>
          <Button
            variant="outline"
            href={profileData.links.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText size={18} /> View Resume
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator for next section */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__mouse">
          <div className="hero__wheel"></div>
        </div>
      </div>
    </section>
  );
};
