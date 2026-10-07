import React from 'react';
import { profileData } from '../../data/profile';
import { experienceData } from '../../data/experience';
import './About.css';

export const About: React.FC = () => {
  return (
    <section id="about" className="about section-padding">
      <div className="content-wrapper">
        <div className="section-header">
          <h2 className="section-title">ABOUT</h2>
          <div className="section-line"></div>
        </div>

        <div className="about__grid">
          {/* Left: Statement */}
          <div className="about__left">
            <p className="about__heading">
              I'm a B.Tech Artificial Intelligence student building practical systems at the intersection of data, AI, and engineering.
            </p>
            <p className="about__desc">
              {profileData.careerDirection} I enjoy taking raw datasets and engineering them into clean, actionable models that solve real-world problems.
            </p>

            <ul className="about__list" aria-label="Focus areas">
              {profileData.positioning.map((item, i) => (
                <li key={i} className="about__list-item">
                  <span className="about__list-arrow">&rarr;</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Experience block */}
            <div className="about__experience">
              <h3 className="about__exp-label">EXPERIENCE</h3>
              <div className="about__exp-divider" />
              {experienceData.map((exp) => (
                <div key={exp.id} className="about__exp-item">
                  <span className="about__exp-year">{exp.period}</span>
                  <div className="about__exp-details">
                    <span className="about__exp-role">{exp.role}</span>
                    <span className="about__exp-org">{exp.organization}</span>
                    <span className="about__exp-tech">{exp.type} &middot; {exp.technologies.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Metadata */}
          <div className="about__right">
            <div className="about__meta">
              <div className="about__meta-row">
                <span className="about__meta-key">LOCATION</span>
                <span className="about__meta-value">India</span>
              </div>
              <div className="about__meta-divider" />
              <div className="about__meta-row">
                <span className="about__meta-key">EDUCATION</span>
                <span className="about__meta-value">
                  B.Tech Artificial Intelligence<br />
                  {profileData.university}<br />
                  <span className="about__meta-sub">{profileData.duration}</span>
                </span>
              </div>
              <div className="about__meta-divider" />
              <div className="about__meta-row">
                <span className="about__meta-key">FOCUS</span>
                <span className="about__meta-value">AI &times; Data &times; Engineering</span>
              </div>
              <div className="about__meta-divider" />
              <div className="about__meta-row">
                <span className="about__meta-key">STATUS</span>
                <span className="about__meta-value about__meta-value--available">
                  <span className="about__status-dot" />
                  Open to Opportunities
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
