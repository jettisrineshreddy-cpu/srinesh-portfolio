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
          LET&rsquo;S BUILD<br />SOMETHING USEFUL.
        </h2>

        <p className="contact__desc">
          Have a project, internship opportunity, or research idea?<br className="contact__br" /> Let&rsquo;s talk.
        </p>

        <div className="contact__links">
          <a href={`mailto:${profileData.links.email}`} className="contact__link">
            <span className="contact__link-label">EMAIL</span>
            <span className="contact__link-arrow">&rarr;</span>
          </a>
          <a href={profileData.links.github} className="contact__link" target="_blank" rel="noopener noreferrer">
            <span className="contact__link-label">GITHUB</span>
            <span className="contact__link-arrow">&rarr;</span>
          </a>
          <a href={profileData.links.linkedin} className="contact__link" target="_blank" rel="noopener noreferrer">
            <span className="contact__link-label">LINKEDIN</span>
            <span className="contact__link-arrow">&rarr;</span>
          </a>
          <a href={profileData.links.resume} className="contact__link" target="_blank" rel="noopener noreferrer">
            <span className="contact__link-label">RESUME</span>
            <span className="contact__link-arrow">&rarr;</span>
          </a>
        </div>

        <p className="contact__email-display">{profileData.links.email}</p>
      </div>

      <footer className="footer">
        <div className="footer__inner content-wrapper">
          <div className="footer__rule" />
          <div className="footer__row">
            <a href="#hero" className="footer__brand" aria-label="Back to top">
              <span className="footer__name">J. SRINESH</span>
              <span className="footer__tagline">AI &times; DATA &times; ENGINEERING</span>
            </a>
            <nav className="footer__links" aria-label="Footer links">
              <a href={profileData.links.github} target="_blank" rel="noopener noreferrer" className="footer__link">GitHub</a>
              <a href={profileData.links.linkedin} target="_blank" rel="noopener noreferrer" className="footer__link">LinkedIn</a>
              <a href={`mailto:${profileData.links.email}`} className="footer__link">Email</a>
            </nav>
            <div className="footer__right">
              <span className="footer__year">&copy; {year}</span>
              <a href="#hero" className="footer__top" aria-label="Back to top">&uarr; TOP</a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};
