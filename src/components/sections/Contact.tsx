import React from 'react';
import { profileData } from '../../data/profile';
import './Contact.css';

export const Contact: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="contact">
      <div className="contact__inner content-wrapper">
        <span className="contact__label">GET IN TOUCH</span>

        <h2 className="contact__headline">
          LET&rsquo;S BUILD<br />SOMETHING<br className="contact__br-mobile" /> USEFUL.
        </h2>

        <p className="contact__desc">
          Have a project, internship opportunity, or research idea? Let&rsquo;s talk.
        </p>

        <div className="contact__links">
          <a href={`mailto:${profileData.links.email}`} className="contact__link">
            EMAIL &rarr;
          </a>
          <a href={profileData.links.github} className="contact__link" target="_blank" rel="noopener noreferrer">
            GITHUB &rarr;
          </a>
          <a href={profileData.links.linkedin} className="contact__link" target="_blank" rel="noopener noreferrer">
            LINKEDIN &rarr;
          </a>
          <a href={profileData.links.resume} className="contact__link" target="_blank" rel="noopener noreferrer">
            RESUME &rarr;
          </a>
        </div>

        <p className="contact__email-display">{profileData.links.email}</p>
      </div>

      <footer className="footer">
        <div className="footer__inner content-wrapper">
          <div className="footer__row">
            <span className="footer__name">J. SRINESH</span>
            <span className="footer__tagline">AI &times; DATA &times; ENGINEERING</span>
            <div className="footer__right">
              <span className="footer__year">&copy; {year}</span>
              <a href="#hero" className="footer__top" aria-label="Back to top">
                &uarr; TOP
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};
