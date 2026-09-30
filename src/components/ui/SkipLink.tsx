import React from 'react';
import './SkipLink.css';

/**
 * Visually hidden skip-to-content link.
 * Becomes visible on keyboard focus — WCAG 2.4.1 compliance.
 */
export const SkipLink: React.FC = () => (
  <a className="skip-link" href="#main-content">
    Skip to main content
  </a>
);
