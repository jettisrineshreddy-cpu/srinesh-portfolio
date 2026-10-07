import React from 'react';
import { profileData } from '../../data/profile';
import './ResearchCloud.css';

export const ResearchCloud: React.FC = () => {
  return (
    <section id="research" className="research-cloud section-padding">
      <div className="content-wrapper">
        <div className="section-header">
          <h2 className="section-title">LEARNING & RESEARCH</h2>
          <div className="section-line"></div>
        </div>

        <div className="focus-panels">
          <div className="focus-panel">
            <h3 className="focus-panel__heading">Cloud & Data Engineering</h3>
            <p className="focus-panel__note">{profileData.cloudLearning.note}</p>
            <p className="focus-panel__items">
              {profileData.cloudLearning.technologies.join(' · ')}
            </p>
          </div>

          <div className="focus-panel__divider" />

          <div className="focus-panel">
            <h3 className="focus-panel__heading">Research & Scientific Computing</h3>
            <p className="focus-panel__note">{profileData.research.note}</p>
            <p className="focus-panel__items">
              {profileData.research.areas.join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
