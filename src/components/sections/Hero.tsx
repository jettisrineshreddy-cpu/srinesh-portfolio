import React from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { TechOrbit } from '../ui/TechOrbit';
import { profileData } from '../../data/profile';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero__grid">
        
        {/* Left Column: Content */}
        <div className="hero__content">
          <Badge variant="purple" className="hero__badge">
            ✨ B.Tech AI Portfolio
          </Badge>
          
          <h1 className="hero__title">
            Providing the <span className="text-gradient">best data</span> experience.
          </h1>
          
          <p className="hero__statement">
            I am a 3rd-year B.Tech Artificial Intelligence student focusing on Data Analytics, SQL, Python, and Data Engineering. Check out my projects and skills.
          </p>

          <div className="hero__actions">
            <Button variant="primary" href="#projects">
              Explore Projects
            </Button>
            <Button
              variant="outline"
              href={profileData.links.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </Button>
          </div>
        </div>

        {/* Right Column: Orbit */}
        <div className="hero__visual">
          <TechOrbit />
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
