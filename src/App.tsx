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
import { RoomHUD } from './components/RoomHUD';
import type { RoomStationId } from './components/three/RoomWorld';
import { useGsapAnimations } from './hooks/useGsapAnimations';
import './App.css';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [is3DMode, setIs3DMode] = useState(false);
  const [currentStation, setCurrentStation] = useState<RoomStationId>('overview');

  useGsapAnimations();

  return (
    <div className={`portfolio-app ${is3DMode ? 'is-3d-room-mode' : ''}`}>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      <CustomCursor />
      <SkipLink />
      
      {/* 3D Scene supporting dual modes */}
      <Scene
        is3DMode={is3DMode}
        currentStation={currentStation}
        onSelectStation={(stationId) => setCurrentStation(stationId)}
      />

      {is3DMode ? (
        <RoomHUD
          currentStation={currentStation}
          onSelectStation={(stationId) => setCurrentStation(stationId)}
          onExit3DMode={() => setIs3DMode(false)}
        />
      ) : (
        <>
          <Navbar onToggle3DMode={() => setIs3DMode(true)} />

          <main id="main-content">
            <Hero onEnter3DMode={() => setIs3DMode(true)} />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <ResearchCloud />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
};

export default App;
