import React from 'react';
import './TechOrbit.css';
import { Database, Code2, LineChart, FileJson, GitBranch, Cloud } from 'lucide-react';

export const TechOrbit: React.FC = () => {
  return (
    <div className="tech-orbit">
      {/* Background radial lines */}
      <div className="tech-orbit__rings">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
      </div>
      
      {/* Orbiting Icons */}
      <div className="tech-icon icon-center">
        <Database size={32} color="#00f0ff" />
      </div>
      
      <div className="orbit-track track-1">
        <div className="tech-icon icon-1">
          <Code2 size={24} color="#f8fafc" />
        </div>
        <div className="tech-icon icon-2">
          <LineChart size={24} color="#f8fafc" />
        </div>
      </div>
      
      <div className="orbit-track track-2">
        <div className="tech-icon icon-3">
          <FileJson size={28} color="#c084fc" />
        </div>
        <div className="tech-icon icon-4">
          <GitBranch size={28} color="#c084fc" />
        </div>
        <div className="tech-icon icon-5">
          <Cloud size={28} color="#c084fc" />
        </div>
      </div>
    </div>
  );
};
