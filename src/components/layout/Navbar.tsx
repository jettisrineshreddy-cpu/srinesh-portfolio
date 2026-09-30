import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { profileData } from '../../data/profile';
import './Navbar.css';

const NAV_LINKS = [
  { href: '#about', label: 'Identity' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#certifications', label: 'Credentials' },
  { href: '#research', label: 'Research' },
  { href: '#contact', label: 'Connect' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Solidify navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section highlighting via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'skills', 'certifications', 'research', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <a href="#hero" className="navbar__brand" aria-label="J. Srinesh – Home" onClick={closeMobile}>
          <span className="navbar__brand-prefix">//</span>
          <span className="navbar__brand-name">{profileData.name}</span>
          <span className="navbar__brand-badge">B.Tech AI</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__links">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`navbar__link ${activeSection === href.slice(1) ? 'navbar__link--active' : ''}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="navbar__actions">
          <a
            href={profileData.links.resume}
            className="navbar__cta"
            aria-label="View Resume (opens in new tab)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText size={16} />
            <span>Resume</span>
          </a>

          <div className="navbar__socials" aria-label="Social links">
            <a href={profileData.links.github} aria-label="GitHub Profile" className="navbar__icon-link" target="_blank" rel="noopener noreferrer">
              <GithubIcon size={18} />
            </a>
            <a href={profileData.links.linkedin} aria-label="LinkedIn Profile" className="navbar__icon-link" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon size={18} />
            </a>
            <a href={`mailto:${profileData.links.email}`} aria-label="Send Email" className="navbar__icon-link">
              <Mail size={18} />
            </a>
          </div>

          <button
            className="navbar__menu-toggle"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <nav
        id="mobile-menu"
        className={`navbar__mobile-drawer ${mobileMenuOpen ? 'navbar__mobile-drawer--open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
      >
        <ul className="navbar__mobile-links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="navbar__mobile-link" onClick={closeMobile}>
                {label}
              </a>
            </li>
          ))}
          <li className="navbar__mobile-cta-item">
            <a
              href={profileData.links.resume}
              className="navbar__mobile-cta"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
            >
              <FileText size={16} />
              <span>View Resume</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
