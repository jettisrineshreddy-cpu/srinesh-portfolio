import React from 'react';
import './Background.css';

export const Background: React.FC = () => {
  return (
    <div className="background" aria-hidden="true">
      <div className="background__base" />
      <div className="background__glow--blue" />
      <div className="background__glow--violet" />
      <div className="background__glow--cyan" />
      <div className="background__texture" />
    </div>
  );
};
