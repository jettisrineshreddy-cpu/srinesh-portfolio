import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { experienceData } from '../../data/experience';
import { certificationsData } from '../../data/certifications';
import './RoomWorld.css';

export type RoomStationId = 'overview' | 'about' | 'projects' | 'experience' | 'skills' | 'contact';

interface RoomStationConfig {
  id: RoomStationId;
  label: string;
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
}

export const ROOM_STATIONS: RoomStationConfig[] = [
  {
    id: 'overview',
    label: 'LAB OVERVIEW',
    cameraPos: [0, 5, 11],
    targetPos: [0, 1.2, 0],
  },
  {
    id: 'about',
    label: 'BIOMETRIC ARCHIVE',
    cameraPos: [-4.2, 2.8, 3.8],
    targetPos: [-3.8, 2, -0.5],
  },
  {
    id: 'projects',
    label: 'PROJECT TERMINAL',
    cameraPos: [0, 2.5, 4.2],
    targetPos: [0, 1.8, 0],
  },
  {
    id: 'experience',
    label: 'EXPEDITION & CREDS',
    cameraPos: [4.4, 2.6, 3.5],
    targetPos: [3.8, 1.8, -0.5],
  },
  {
    id: 'skills',
    label: 'NEURAL CONSTELLATION',
    cameraPos: [0, 6.2, 2.5],
    targetPos: [0, 2, 0],
  },
  {
    id: 'contact',
    label: 'COMMS ARRAY',
    cameraPos: [0, 1.6, 5.5],
    targetPos: [0, 1.2, 2.5],
  },
];

interface RoomCameraRigProps {
  currentStation: RoomStationId;
}

const RoomCameraRig: React.FC<RoomCameraRigProps> = ({ currentStation }) => {
  const { camera } = useThree();
  const station = ROOM_STATIONS.find((s) => s.id === currentStation) || ROOM_STATIONS[0];
  const targetLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  useFrame((_, delta) => {
    const step = Math.min(delta * 2.8, 0.1);
    camera.position.lerp(new THREE.Vector3(...station.cameraPos), step);
    targetLookAt.current.lerp(new THREE.Vector3(...station.targetPos), step);
    camera.lookAt(targetLookAt.current);
  });

  return null;
};

// ─── 3D SCI-FI ROOM ENVIRONMENT MESHES ──────────────────────────────────────

const LaboratoryFloor: React.FC = () => {
  return (
    <group position={[0, -0.01, 0]}>
      {/* Dark reflective floor slab */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color="#05080c" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Grid line indicator */}
      <gridHelper args={[24, 24, '#1b2a38', '#0b131b']} position={[0, 0.02, 0]} />

      {/* Central circular observation pedestal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[2.2, 2.3, 64]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[4.8, 4.88, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const LaboratoryDeskAndMonitors: React.FC<{ onSelectStation: (id: RoomStationId) => void }> = ({ onSelectStation }) => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const curProject = projectsData[activeProjectIdx] || projectsData[0];

  return (
    <group position={[0, 0, 0]}>
      {/* Central Ergonomic Console Desk */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[4.2, 0.1, 1.6]} />
        <meshStandardMaterial color="#0b0e14" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Desk Support Pillars */}
      <mesh position={[-1.8, 0.45, 0]}>
        <boxGeometry args={[0.2, 0.9, 1.2]} />
        <meshStandardMaterial color="#141a24" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[1.8, 0.45, 0]}>
        <boxGeometry args={[0.2, 0.9, 1.2]} />
        <meshStandardMaterial color="#141a24" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Center Curved Ultrawide Display Screen */}
      <group position={[0, 1.8, -0.4]}>
        {/* Screen Bezel */}
        <mesh>
          <boxGeometry args={[3.2, 1.5, 0.08]} />
          <meshStandardMaterial color="#0d1117" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Screen Stand */}
        <mesh position={[0, -0.8, 0.1]}>
          <cylinderGeometry args={[0.06, 0.08, 0.4]} />
          <meshStandardMaterial color="#21262d" />
        </mesh>

        {/* Interactive Holographic Screen Canvas (via Drei Html) */}
        <Html
          transform
          distanceFactor={1.75}
          position={[0, 0, 0.05]}
          className="room-screen-terminal"
        >
          <div className="terminal-panel">
            <div className="terminal-header">
              <span className="terminal-tag">SYSTEM // WORKSTATION</span>
              <span className="terminal-status">ONLINE · DUAL POWER</span>
            </div>

            <div className="terminal-content">
              <div className="terminal-project-info">
                <span className="terminal-project-num">PROJECT [{String(activeProjectIdx + 1).padStart(2, '0')}/{String(projectsData.length).padStart(2, '0')}]</span>
                <h3 className="terminal-project-title">{curProject.title}</h3>
                <p className="terminal-project-summary">{curProject.summary}</p>
                <div className="terminal-tags">
                  {curProject.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="terminal-pill">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="terminal-controls">
                <button
                  type="button"
                  className="terminal-btn"
                  onClick={() => setActiveProjectIdx((prev) => (prev > 0 ? prev - 1 : projectsData.length - 1))}
                >
                  &larr; PREV
                </button>
                <button
                  type="button"
                  className="terminal-btn"
                  onClick={() => setActiveProjectIdx((prev) => (prev < projectsData.length - 1 ? prev + 1 : 0))}
                >
                  NEXT &rarr;
                </button>
                <button
                  type="button"
                  className="terminal-btn terminal-btn--cta"
                  onClick={() => onSelectStation('projects')}
                >
                  ZOOM TERMINAL
                </button>
              </div>
            </div>
          </div>
        </Html>
      </group>

      {/* Floating Holographic Core above Central Console */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5} position={[0, 3.2, 0]}>
        <mesh>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#60a5fa" wireframe />
        </mesh>
        <pointLight color="#3b82f6" intensity={2} distance={5} />
      </Float>
    </group>
  );
};

// ─── BIOMETRIC / ABOUT POD ──────────────────────────────────────────────────

const BiometricStation: React.FC<{ onSelect: () => void }> = ({ onSelect }) => {
  return (
    <group position={[-4.2, 0, -0.6]} rotation={[0, 0.45, 0]}>
      {/* Station Base Plate */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.4, 1.5, 0.1, 32]} />
        <meshStandardMaterial color="#0e131b" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Vertical Holographic Frame */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[1.6, 2.4, 0.06]} />
        <meshStandardMaterial color="#161e2b" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Hologram Glass UI */}
      <Html
        transform
        distanceFactor={1.8}
        position={[0, 1.8, 0.04]}
        className="room-biometric-panel"
      >
        <div className="bio-card" onClick={onSelect}>
          <div className="bio-photo-wrapper">
            <img src="/profile.png" alt="J. Srinesh" className="bio-photo" />
            <div className="bio-scan-line" />
          </div>
          <div className="bio-details">
            <span className="bio-label">IDENTITY VERIFIED</span>
            <h4 className="bio-name">{profileData.name}</h4>
            <p className="bio-degree">{profileData.degree}</p>
            <p className="bio-inst">{profileData.university} · {profileData.campus}</p>
            <span className="bio-status">● ACTIVE: 2024–2028</span>
          </div>
        </div>
      </Html>
    </group>
  );
};

// ─── CREDENTIALS & EXPEDITION TOWER ─────────────────────────────────────────

const ExperienceStation: React.FC<{ onSelect: () => void }> = ({ onSelect }) => {
  return (
    <group position={[4.2, 0, -0.6]} rotation={[0, -0.45, 0]}>
      {/* Tower Base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.4, 1.5, 0.1, 32]} />
        <meshStandardMaterial color="#0e131b" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Vertical Holographic Display Tower */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[1.8, 2.4, 0.06]} />
        <meshStandardMaterial color="#161e2b" roughness={0.3} metalness={0.8} />
      </mesh>

      <Html
        transform
        distanceFactor={1.8}
        position={[0, 1.8, 0.04]}
        className="room-exp-panel"
      >
        <div className="exp-card" onClick={onSelect}>
          <div className="exp-header">
            <span className="exp-badge">CAREER PROGRESSION</span>
            <span className="exp-count">{experienceData.length} INTERNSHIPS</span>
          </div>
          <div className="exp-list">
            {experienceData.slice(0, 3).map((item) => (
              <div key={item.id} className="exp-row">
                <span className="exp-period">{item.period}</span>
                <span className="exp-org">{item.organization}</span>
                <span className="exp-role">{item.role}</span>
              </div>
            ))}
          </div>
          <div className="exp-certs-preview">
            <span className="exp-certs-tag">MICROSOFT CERTIFIED:</span>
            <span>{certificationsData.map((c) => c.code).join(' · ')}</span>
          </div>
        </div>
      </Html>
    </group>
  );
};

// ─── COMMS ARRAY (CONTACT TERMINAL) ─────────────────────────────────────────

const CommsStation: React.FC<{ onSelect: () => void }> = ({ onSelect }) => {
  return (
    <group position={[0, 0, 3.8]}>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.7, 0.8, 0.9, 16]} />
        <meshStandardMaterial color="#0b1016" roughness={0.5} metalness={0.7} />
      </mesh>

      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8} position={[0, 1.4, 0]}>
        <Html transform distanceFactor={1.6} className="room-comms-panel">
          <div className="comms-card" onClick={onSelect}>
            <span className="comms-tag">TRANSMISSION CHANNEL</span>
            <h4 className="comms-title">CONNECT WITH SRINESH</h4>
            <div className="comms-buttons">
              <a href={`mailto:${profileData.links.email}`} className="comms-link" target="_blank" rel="noreferrer">
                EMAIL TRANSMISSION &rarr;
              </a>
              <a href={profileData.links.linkedin} className="comms-link" target="_blank" rel="noreferrer">
                LINKEDIN FREQUENCY &rarr;
              </a>
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
};

// ─── FULL ROOM ENVIRONMENT COMPONENT ────────────────────────────────────────

interface RoomWorldProps {
  currentStation: RoomStationId;
  onSelectStation: (id: RoomStationId) => void;
}

export const RoomWorld: React.FC<RoomWorldProps> = ({ currentStation, onSelectStation }) => {
  return (
    <group>
      {/* Dynamic Camera lerp */}
      <RoomCameraRig currentStation={currentStation} />

      {/* Atmospheric lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 6]} intensity={1.2} />
      <pointLight position={[0, 4, 0]} color="#38bdf8" intensity={1.5} distance={15} />

      {/* 3D Elements */}
      <LaboratoryFloor />
      <LaboratoryDeskAndMonitors onSelectStation={onSelectStation} />
      <BiometricStation onSelect={() => onSelectStation('about')} />
      <ExperienceStation onSelect={() => onSelectStation('experience')} />
      <CommsStation onSelect={() => onSelectStation('contact')} />
    </group>
  );
};
