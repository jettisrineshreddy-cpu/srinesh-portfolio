import React, { useState } from 'react';
import { certificationsData } from '../../data/certifications';
import { profileData } from '../../data/profile';
import { experienceData, type Experience } from '../../data/experience';
import { ExperienceModal } from './ExperienceModal';
import './Certifications.css';

export const Certifications: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  return (
    <section id="certifications" className="certifications section-padding">
      <div className="content-wrapper">

        {/* 01: INTERNSHIP EXPERIENCE — first because nav says "EXPERIENCE" */}
        <div id="experience" className="section-header">
          <div className="section-header__title-group">
            <h2 className="section-title">EXPERIENCE</h2>
            <div className="section-header__subline">
              <span className="experience-progression">
                DATA SCIENCE &rarr; DATA ANALYTICS &rarr; DATA ANALYST &rarr; AI &times; DATA &times; ENGINEERING
              </span>
            </div>
          </div>
          <div className="section-line" />
          <a
            href={profileData.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="experience__linkedin-cta"
            aria-label="View verified experience on LinkedIn"
          >
            VIEW LINKEDIN &rarr;
          </a>
        </div>

        <div className="certs__list experience__list">
          {experienceData.map((exp, index) => {
            const num = String(index + 1).padStart(2, '0');
            return (
              <div
                key={exp.id}
                className="cert-item experience-item"
                onClick={() => setSelectedExp(exp)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedExp(exp); }}
                aria-label={`View details for ${exp.role} at ${exp.organization}`}
              >
                <div className="cert-item__left">
                  <div className="experience-item__top-meta">
                    <span className="experience-item__num">{num}</span>
                    <span className="cert-item__code">{exp.period}</span>
                    <span className="experience-item__type">&middot; {exp.type}</span>
                  </div>
                  <span className="cert-item__name experience-item__title">{exp.role}</span>
                  <span className="cert-item__meta">{exp.organization}</span>
                  <p className="experience-item__desc">{exp.description}</p>
                </div>

                <div className="experience-item__right">
                  <span className="cert-item__tag">{exp.technologies.slice(0, 3).join(' · ')}</span>
                  <button
                    type="button"
                    className="experience-item__btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedExp(exp);
                    }}
                    aria-label={`View details for ${exp.role}`}
                  >
                    VIEW DETAILS &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 02: CREDENTIALS */}
        <div id="credentials" className="section-header" style={{ marginTop: '5rem' }}>
          <h2 className="section-title">CREDENTIALS</h2>
          <div className="section-line" />
        </div>

        <div className="certs__list">
          {certificationsData.map((cert) => (
            <div key={cert.id} className="cert-item">
              <div className="cert-item__left">
                <span className="cert-item__code">{cert.code}</span>
                <span className="cert-item__name">{cert.name}</span>
                <span className="cert-item__meta">{cert.issuer} &middot; {cert.status}</span>
              </div>
              <a
                href={cert.verificationUrl}
                className="cert-item__link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${cert.name} certificate`}
              >
                VERIFY &rarr;
              </a>
            </div>
          ))}
        </div>

        {/* 03: EDUCATION */}
        <div id="education" className="section-header" style={{ marginTop: '5rem' }}>
          <h2 className="section-title">EDUCATION</h2>
          <div className="section-line" />
        </div>

        <div className="edu__block cert-item">
          <div className="cert-item__left">
            <span className="cert-item__code">{profileData.duration}</span>
            <h3 className="cert-item__name">{profileData.degree}</h3>
            <span className="cert-item__meta">{profileData.university} &middot; {profileData.campus}</span>
            <div className="edu__tags">
              <span className="edu__tag">AI Systems &amp; Neural Nets</span>
              <span className="edu__tag">Data Engineering &amp; Pipelines</span>
              <span className="edu__tag">Machine Learning &amp; Analytics</span>
              <span className="edu__tag">Scientific Computing</span>
            </div>
          </div>
        </div>

      </div>

      <ExperienceModal
        experience={selectedExp}
        onClose={() => setSelectedExp(null)}
      />
    </section>
  );
};
