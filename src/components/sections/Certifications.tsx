import React from 'react';
import { certificationsData } from '../../data/certifications';
import { Award, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/Badge';
import './Certifications.css';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="certifications section-padding">
      <div className="section-header">
        <h2 className="section-title">Credentials</h2>
        <div className="section-line"></div>
      </div>

      <div className="certifications__grid">
        {certificationsData.map((cert) => (
          <div key={cert.id} className="cert-card">
            <div className="cert-card__icon">
              <Award size={32} />
            </div>
            <div className="cert-card__content">
              <div className="cert-card__header">
                <span className="cert-card__issuer">{cert.issuer}</span>
                <Badge variant={cert.status === 'Completed' ? 'emerald' : 'cyan'}>
                  {cert.status}
                </Badge>
              </div>
              <h3 className="cert-card__title">{cert.name}</h3>
              <p className="cert-card__code">Exam: {cert.code}</p>
              <p className="cert-card__desc">{cert.description}</p>
              
              <a 
                href={cert.verificationUrl} 
                className="cert-card__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify Credential <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
