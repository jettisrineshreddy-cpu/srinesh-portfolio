import React from 'react';
import { profileData } from '../../data/profile';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { Mail, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import './Contact.css';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact section-padding">
      <div className="contact__container">
        <div className="contact__header">
          <h2 className="contact__title">Initialize Connection</h2>
          <p className="contact__desc">
            Currently open for internships, collaborative projects, and discussions 
            in AI, Data Analytics, and Data Engineering.
          </p>
        </div>

        <div className="contact__actions">
          <Button 
            variant="primary" 
            href={`mailto:${profileData.links.email}`}
            className="contact__main-btn"
          >
            <Mail size={18} /> Connect via Email
          </Button>

          <div className="contact__socials">
            <a href={profileData.links.github} target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="GitHub">
              <GithubIcon size={24} />
            </a>
            <a href={profileData.links.linkedin} target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="LinkedIn">
              <LinkedinIcon size={24} />
            </a>
            <a href={profileData.links.resume} target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="Resume">
              <FileText size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <footer className="footer">
        <p className="footer__text">
          &copy; {new Date().getFullYear()} {profileData.name}. Designed & Engineered with React + Three.js.
        </p>
      </footer>
    </section>
  );
};
