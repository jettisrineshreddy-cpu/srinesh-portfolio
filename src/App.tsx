import React, { useState } from 'react';
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
import { Loader } from './components/ui/Loader';
import { CustomCursor } from './components/ui/CustomCursor';
import { useGsapAnimations } from './hooks/useGsapAnimations';
import './App.css';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useGsapAnimations();

  return (
    <div className="portfolio-app">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      <CustomCursor />
      <SkipLink />
      <Scene />
      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <ResearchCloud />
        <Contact />
      </main>
    </div>
  );
};

export default App;
