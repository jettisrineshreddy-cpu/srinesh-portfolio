import React from 'react';
import { certificationsData } from '../../data/certifications';
import { profileData } from '../../data/profile';
import './Certifications.css';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="certifications section-padding">
      <div className="content-wrapper">

        {/* EDUCATION — top and most important */}
        <div className="section-header">
          <h2 className="section-title">EDUCATION</h2>
          <div className="section-line" />
        </div>

        <div className="edu__block cert-item">
          <div className="cert-item__left">
            <span className="cert-item__code">{profileData.duration}</span>
            <span className="cert-item__name">{profileData.degree}</span>
            <span className="cert-item__meta">{profileData.university} &middot; {profileData.campus}</span>
          </div>
          <span className="cert-item__tag">AI Systems &middot; Data Engineering &middot; Machine Learning &middot; Scientific Computing</span>
        </div>

        {/* EXPERIENCE */}
        <div className="section-header" style={{ marginTop: '5rem' }}>
          <h2 className="section-title">EXPERIENCE</h2>
          <div className="section-line" />
        </div>

        <div className="certs__list">
          <div className="cert-item">
            <div className="cert-item__left">
              <span className="cert-item__code">2024</span>
              <span className="cert-item__name">AI &amp; Data Learning Program</span>
              <span className="cert-item__meta">Infosys Springboard &middot; Learning Program</span>
            </div>
            <span className="cert-item__tag">Python &middot; Data Analysis &middot; AI Fundamentals</span>
          </div>
        </div>

        {/* CREDENTIALS */}
        <div className="section-header" style={{ marginTop: '5rem' }}>
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

      </div>
    </section>
  );
};
