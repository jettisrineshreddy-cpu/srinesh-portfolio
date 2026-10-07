import React, { useState, useEffect } from 'react';
import { profileData } from '../../data/profile';
import './Navbar.css';

const NAV_LINKS = [
  { href: '#hero', label: 'HOME' },
  { href: '#about', label: 'ABOUT' },
  { href: '#projects', label: 'WORK' },
  { href: '#certifications', label: 'EXPERIENCE' },
  { href: '#contact', label: 'CONTACT' },
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ids = ['hero', 'about', 'projects', 'certifications', 'research', 'contact'];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <a href="#hero" className="navbar__brand" onClick={close} aria-label="J. Srinesh — Home">
            SRINESH
          </a>

          <nav className="navbar__nav" aria-label="Main navigation">
            <ul className="navbar__links">
              {NAV_LINKS.map(({ href, label }) => {
                const id = href.slice(1);
                const isActive =
                  activeSection === id ||
                  (id === 'certifications' && activeSection === 'certifications');
                return (
                  <li key={href}>
                    <a
                      href={href}
                      className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="navbar__right">
            <a
              href={profileData.links.resume}
              className="navbar__cta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume"
            >
              RESUME &rarr;
            </a>

            <button
              className={`navbar__toggle${mobileOpen ? ' navbar__toggle--open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className={`mobile-menu${mobileOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className="mobile-menu__links">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="mobile-menu__link" onClick={close}>
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profileData.links.resume}
                className="mobile-menu__link mobile-menu__link--cta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
              >
                RESUME &rarr;
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
