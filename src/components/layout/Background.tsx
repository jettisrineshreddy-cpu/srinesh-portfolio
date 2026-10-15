import React from 'react';
import './Background.css';

export const Background: React.FC = () => {
  return (
    <div className="background" aria-hidden="true">
      <div className="background__base" />
      <div className="background__glow--crimson" />
      <div className="background__glow--ruby" />
      <div className="background__glow--burgundy" />
      <div className="background__glow--scarlet" />
      <div className="background__texture" />
    </div>
  );
};
