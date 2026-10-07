import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Scene } from './components/three/Scene';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Interstitial } from './components/sections/Interstitial';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Certifications } from './components/sections/Certifications';
import { ResearchCloud } from './components/sections/ResearchCloud';
import { Contact } from './components/sections/Contact';
import { SkipLink } from './components/ui/SkipLink';
import { Loader } from './components/ui/Loader';
import { CustomCursor } from './components/ui/CustomCursor';
import { useGsapAnimations } from './hooks/useGsapAnimations';
import './App.css';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // We only run GSAP section animations after loading is complete
  // But useGsapAnimations runs on mount. 
  // Let's ensure it has a way to know if loading is done, or we only mount main content after.
  
  // For now, we mount main content anyway so GSAP finds the nodes, 
  // but we hide them using CSS if needed, or we just let GSAP run.
  // Actually, mounting main content and running GSAP is fine. The loader is just an overlay.
  useGsapAnimations();

  return (
    <div className="portfolio-app">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      <CustomCursor />
      
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
        <Interstitial />
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
