import React from 'react';
import { profileData } from '../../data/profile';
import { Cloud, Network } from 'lucide-react';
import { Badge } from '../ui/Badge';
import './ResearchCloud.css';

export const ResearchCloud: React.FC = () => {
  return (
    <section id="research" className="research-cloud section-padding">
      <div className="research-cloud__grid">
        
        {/* Cloud & Data Engineering Learning */}
        <div className="focus-card">
          <div className="focus-card__header">
            <div className="focus-card__icon-wrapper">
              <Cloud size={24} />
            </div>
            <h3 className="focus-card__title">{profileData.cloudLearning.title}</h3>
          </div>
          <p className="focus-card__desc">{profileData.cloudLearning.note}</p>
          <div className="focus-card__tags">
            {profileData.cloudLearning.technologies.map((tech, i) => (
              <Badge key={i} variant="default">{tech}</Badge>
            ))}
          </div>
        </div>

        {/* Research & Scientific Computing */}
        <div className="focus-card">
          <div className="focus-card__header">
            <div className="focus-card__icon-wrapper focus-card__icon-wrapper--purple">
              <Network size={24} />
            </div>
            <h3 className="focus-card__title">{profileData.research.title}</h3>
          </div>
          <p className="focus-card__desc">{profileData.research.note}</p>
          <div className="focus-card__tags">
            {profileData.research.areas.map((area, i) => (
              <Badge key={i} variant="purple">{area}</Badge>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
