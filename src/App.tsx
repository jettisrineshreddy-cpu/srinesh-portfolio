import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Scene } from './components/three/Scene';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Certifications } from './components/sections/Certifications';
import { ResearchCloud } from './components/sections/ResearchCloud';
import { Contact } from './components/sections/Contact';
import { SkipLink } from './components/ui/SkipLink';
import { useGsapAnimations } from './hooks/useGsapAnimations';
import './App.css';

export const App: React.FC = () => {
  useGsapAnimations();

  return (
    <div className="portfolio-app">
      {/* Accessibility: keyboard skip-to-content link */}
      <SkipLink />

      {/* 3D WebGL Background (aria-hidden — decorative only) */}
      <Scene />

      {/* Fixed navigation bar */}
      <Navbar />

      {/* Main scrollable content */}
      <main id="main-content" className="content-wrapper">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <ResearchCloud />
        <Contact />
      </main>
    </div>
  );
};

export default App;
