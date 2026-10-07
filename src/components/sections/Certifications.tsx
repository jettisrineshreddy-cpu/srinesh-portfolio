import React from 'react';
import { certificationsData } from '../../data/certifications';
import { profileData } from '../../data/profile';
import './Certifications.css';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="certifications section-padding">
      <div className="content-wrapper">

        {/* CREDENTIALS */}
        <div className="section-header">
          <h2 className="section-title">CREDENTIALS</h2>
          <div className="section-line"></div>
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

        {/* EDUCATION */}
        <div className="edu">
          <div className="section-header" style={{ marginTop: '5rem' }}>
            <h2 className="section-title">EDUCATION</h2>
            <div className="section-line"></div>
          </div>

          <div className="edu__block">
            <div className="edu__left">
              <p className="edu__degree">{profileData.degree}</p>
              <p className="edu__uni">{profileData.university} &middot; {profileData.campus}</p>
              <p className="edu__duration">{profileData.duration}</p>
            </div>
            <div className="edu__right">
              <p className="edu__note">
                Focused on AI systems, data engineering, machine learning, and scientific computing.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
