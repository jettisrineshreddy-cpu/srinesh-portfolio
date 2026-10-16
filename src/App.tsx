import React, { useState, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Background } from './components/layout/Background';
import { Scene } from './components/three/Scene';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Certifications } from './components/sections/Certifications';
import { ResearchCloud } from './components/sections/ResearchCloud';
import { Contact } from './components/sections/Contact';
import { SkipLink } from './components/ui/SkipLink';
import { Intro } from './components/intro/Intro';
import { CustomCursor } from './components/ui/CustomCursor';
import { useGsapAnimations } from './hooks/useGsapAnimations';
import './App.css';

export const App: React.FC = () => {
  const [introComplete, setIntroComplete] = useState(
    () => sessionStorage.getItem('introSeen') === 'true'
  );
  const [introKey, setIntroKey] = useState(0);
  const [showReplay, setShowReplay] = useState(false);

  // Lock scroll and ensure top position while intro is active
  React.useEffect(() => {
    if (!introComplete) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [introComplete, introKey]);

  useGsapAnimations(introComplete);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
    document.body.style.overflow = '';
    // Show replay button after a short delay
    setTimeout(() => setShowReplay(true), 1000);
  }, []);

  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    sessionStorage.removeItem('introSeen');
    setIntroKey((prev) => prev + 1);
    setIntroComplete(false);
    setShowReplay(false);
  }, []);

  return (
    <div className="portfolio-app">
      {!introComplete && <Intro key={introKey} onComplete={handleIntroComplete} />}
      
      <CustomCursor />
      <SkipLink />
      <Background />
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

      {showReplay && (
        <button
          className="replay-btn"
          onClick={handleReplay}
          aria-label="Replay intro animation"
          title="Replay Intro"
        >
          ↻
        </button>
      )}
    </div>
  );
};

export default App;
