import React, { useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export interface Intro3DSceneHandle {
  setStage: (stage: 'jsr' | 'name' | 'out') => void;
  setTimelineProgress: (progress: number) => void;
  setSweepX: (x: number) => void;
  setHazeOpacity: (opacity: number) => void;
}

interface Intro3DSceneProps {
  fontData: any;
}

// Particle count for converge & edge embers
const PARTICLE_COUNT = 900;

export const Intro3DScene = forwardRef<Intro3DSceneHandle, Intro3DSceneProps>(function Intro3DScene(
  { fontData },
  ref
) {
  const font = useMemo(() => new Font(fontData), [fontData]);

  // Group references
  const jsrGroupRef = useRef<THREE.Group>(null);
  const nameGroupRef = useRef<THREE.Group>(null);
  const tagGroupRef = useRef<THREE.Group>(null);
  const hazeMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const sweepMeshRef = useRef<THREE.Mesh>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  // Materials for 3D metallic typography
  const jsrMaterials = useMemo(() => {
    // Front face: brushed dark metallic with crimson rim response
    const front = new THREE.MeshStandardMaterial({
      color: 0x140609,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0x3d0309,
      emissiveIntensity: 0.7,
      transparent: true,
      opacity: 1,
    });
    // Side/bevel: glowing incandescent crimson metallic edge (Reference 2 & 3)
    const sides = new THREE.MeshStandardMaterial({
      color: 0x240206,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0xff1e3c,
      emissiveIntensity: 1.4,
      transparent: true,
      opacity: 1,
    });
    return [front, sides];
  }, []);

  const nameMaterials = useMemo(() => {
    // Searing incandescent white-hot core with distressed dark metallic body (Reference 3 "TRUTH")
    const front = new THREE.MeshStandardMaterial({
      color: 0xfff0f3,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0xff2a48,
      emissiveIntensity: 0.85,
      transparent: true,
      opacity: 0,
    });
    // High-luminous ruby red bevel edges
    const sides = new THREE.MeshStandardMaterial({
      color: 0x300208,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0xff0f32,
      emissiveIntensity: 1.8,
      transparent: true,
      opacity: 0,
    });
    return [front, sides];
  }, []);

  const tagMaterials = useMemo(() => {
    const front = new THREE.MeshBasicMaterial({
      color: 0xffb8c6,
      transparent: true,
      opacity: 0,
    });
    return [front, front];
  }, []);

  // 3D Geometry: JSR
  const { jsrGeo, jsrPoints } = useMemo(() => {
    const geo = new TextGeometry('JSR', {
      font,
      size: 1.85,
      depth: 0.55,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    geo.computeBoundingBox();
    geo.center();

    // Sample surface points from vertex positions for particles to converge toward
    const posAttr = geo.attributes.position;
    const vertexCount = posAttr.count;
    const targets = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Pick random vertices from the geometry
      const vIdx = Math.floor(Math.random() * vertexCount);
      targets[i * 3] = posAttr.getX(vIdx) + (Math.random() - 0.5) * 0.08;
      targets[i * 3 + 1] = posAttr.getY(vIdx) + (Math.random() - 0.5) * 0.08;
      targets[i * 3 + 2] = posAttr.getZ(vIdx) + 0.1 + (Math.random() - 0.5) * 0.15;
    }

    return { jsrGeo: geo, jsrPoints: targets };
  }, [font]);

  // 3D Geometry: JETTI SRINESH REDDY
  const nameGeo = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const size = isMobile ? 0.38 : 0.65;
    const depth = isMobile ? 0.12 : 0.22;

    const geo = new TextGeometry('JETTI SRINESH REDDY', {
      font,
      size,
      depth,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: isMobile ? 0.025 : 0.04,
      bevelSize: isMobile ? 0.015 : 0.025,
      bevelSegments: 4,
    });
    geo.computeBoundingBox();
    geo.center();
    return geo;
  }, [font]);

  // 3D Geometry: AI • DATA • ENGINEERING
  const tagGeo = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const size = isMobile ? 0.14 : 0.22;

    const geo = new TextGeometry('AI  •  DATA  •  ENGINEERING', {
      font,
      size,
      depth: 0.02,
      curveSegments: 6,
      bevelEnabled: false,
    });
    geo.computeBoundingBox();
    geo.center();
    return geo;
  }, [font]);

  // Particle System Data: Starting scattered cloud -> Target JSR positions -> Disperse
  const particlesMeshRef = useRef<THREE.InstancedMesh>(null);
  const particleMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particleData = useMemo(() => {
    const currentPositions = new Float32Array(PARTICLE_COUNT * 3);
    const startPositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Random scattered starting sphere
      const r = 4 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      startPositions[i3] = r * Math.cos(theta) * Math.cos(phi);
      startPositions[i3 + 1] = r * Math.sin(phi);
      startPositions[i3 + 2] = r * Math.sin(theta) * Math.cos(phi);

      currentPositions[i3] = startPositions[i3];
      currentPositions[i3 + 1] = startPositions[i3 + 1];
      currentPositions[i3 + 2] = startPositions[i3 + 2];

      velocities[i3] = (Math.random() - 0.5) * 0.4;
      velocities[i3 + 1] = 0.2 + Math.random() * 0.6;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.3;

      sizes[i] = 0.015 + Math.random() * 0.035;

      // Crimson, ruby, hot incandescent white/orange embers
      const rand = Math.random();
      if (rand < 0.45) {
        // Vivid crimson / red
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.08;
        colors[i3 + 2] = 0.18;
      } else if (rand < 0.75) {
        // Deep ruby / scarlet
        colors[i3] = 0.85;
        colors[i3 + 1] = 0.03;
        colors[i3 + 2] = 0.08;
      } else {
        // Hot white-pink ember core
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.65;
        colors[i3 + 2] = 0.75;
      }
    }

    return { currentPositions, startPositions, velocities, sizes, colors };
  }, []);

  // Atmospheric Volumetric Haze Texture
  const hazeTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2
      );
      gradient.addColorStop(0, 'rgba(235, 20, 55, 0.7)');
      gradient.addColorStop(0.3, 'rgba(185, 12, 38, 0.4)');
      gradient.addColorStop(0.65, 'rgba(100, 6, 20, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Light Sweep texture
  const sweepTexture = useMemo(() => {
    const w = 128;
    const h = 512;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, w, 0);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(0.35, 'rgba(255, 30, 60, 0.25)');
      gradient.addColorStop(0.5, 'rgba(255, 240, 245, 0.8)');
      gradient.addColorStop(0.65, 'rgba(255, 30, 60, 0.25)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Timeline & State references for smooth per-frame updates
  const stateRef = useRef({
    stage: 'jsr' as 'jsr' | 'name' | 'out',
    convergeFactor: 0, // 0 = fully scattered, 1 = snapped to JSR text
    disperseFactor: 0, // when transitioning to name, detach outward
    nameRevealFactor: 0,
    tagRevealFactor: 0,
    sweepX: -10,
    hazeOpacity: 0,
  });

  // Expose imperative handle for GSAP
  useImperativeHandle(ref, () => ({
    setStage: (stage: 'jsr' | 'name' | 'out') => {
      stateRef.current.stage = stage;
    },
    setTimelineProgress: (p: number) => {
      // 0.0 - 0.5s: Darkness & early particles
      // 0.5 - 1.8s: Converge to JSR
      // 1.8 - 3.5s: Dissolve JSR & reveal full metallic name
      // 3.5 - 4.3s: Reveal supporting tag
      // 4.3 - 5.0s: Fade out
      if (p <= 0.35) {
        // Stage 1: Particles converge to JSR
        const t = Math.max(0, (p - 0.08) / 0.27);
        stateRef.current.convergeFactor = Math.min(1, Math.pow(t, 1.8));
        stateRef.current.stage = 'jsr';

        // JSR letter opacity & scale in
        const jsrOpacity = Math.min(1, Math.max(0, (p - 0.12) / 0.2));
        jsrMaterials[0].opacity = jsrOpacity;
        jsrMaterials[1].opacity = jsrOpacity;
        if (jsrGroupRef.current) {
          const sc = 0.88 + 0.12 * Math.min(1, t);
          jsrGroupRef.current.scale.set(sc, sc, sc);
        }
      } else if (p <= 0.72) {
        // Stage 2: JSR dissolves into name
        stateRef.current.stage = 'name';
        const transT = (p - 0.35) / 0.37;

        // Disperse JSR letters
        const jsrFade = Math.max(0, 1 - transT * 3);
        jsrMaterials[0].opacity = jsrFade;
        jsrMaterials[1].opacity = jsrFade;

        // Disperse particles from letter edges
        stateRef.current.disperseFactor = transT;

        // Reveal Full Name
        const nameT = Math.min(1, Math.max(0, (p - 0.4) / 0.28));
        stateRef.current.nameRevealFactor = nameT;
        nameMaterials[0].opacity = nameT;
        nameMaterials[1].opacity = nameT;

        if (nameGroupRef.current) {
          const sc = 0.94 + 0.06 * nameT;
          nameGroupRef.current.scale.set(sc, sc, sc);
        }
      } else {
        // Stage 3 & 4: Tag reveal & dissolve
        stateRef.current.stage = 'out';
        nameMaterials[0].opacity = 1;
        nameMaterials[1].opacity = 1;

        const tagT = Math.min(1, Math.max(0, (p - 0.72) / 0.16));
        stateRef.current.tagRevealFactor = tagT;
        tagMaterials[0].opacity = tagT;
      }
    },
    setSweepX: (x: number) => {
      stateRef.current.sweepX = x;
      if (sweepMeshRef.current) {
        sweepMeshRef.current.position.x = x;
      }
    },
    setHazeOpacity: (opacity: number) => {
      stateRef.current.hazeOpacity = opacity;
      if (hazeMaterialRef.current) {
        hazeMaterialRef.current.opacity = opacity;
      }
    },
  }));

  // Setup instance colors
  React.useEffect(() => {
    const mesh = particlesMeshRef.current;
    if (!mesh) return;
    const col = new THREE.Color();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      col.setRGB(
        particleData.colors[i3],
        particleData.colors[i3 + 1],
        particleData.colors[i3 + 2]
      );
      mesh.setColorAt(i, col);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [particleData]);

  // Frame animation: Particle convergence, turbulence, edge scattering
  useFrame(({ clock }, delta) => {
    const mesh = particlesMeshRef.current;
    if (!mesh) return;

    const time = clock.getElapsedTime();
    const dt = Math.min(delta, 0.05);
    const { convergeFactor, disperseFactor } = stateRef.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      if (disperseFactor > 0) {
        // Disperse / float outward around full name
        particleData.currentPositions[i3] += particleData.velocities[i3] * dt * 2.5;
        particleData.currentPositions[i3 + 1] += particleData.velocities[i3 + 1] * dt * 1.8;
        particleData.currentPositions[i3 + 2] += particleData.velocities[i3 + 2] * dt * 1.5;
      } else {
        // Lerp between starting scattered cloud and target 3D JSR points
        const targetX = jsrPoints[i3];
        const targetY = jsrPoints[i3 + 1];
        const targetZ = jsrPoints[i3 + 2];

        const startX = particleData.startPositions[i3];
        const startY = particleData.startPositions[i3 + 1];
        const startZ = particleData.startPositions[i3 + 2];

        // S-curve interpolation
        const cx = startX + (targetX - startX) * convergeFactor;
        const cy = startY + (targetY - startY) * convergeFactor;
        const cz = startZ + (targetZ - startZ) * convergeFactor;

        // Subtle electric vibration when locked on surface (Reference 1)
        const jitter = (1 - convergeFactor) * 0.15 + 0.02 * Math.sin(time * 12 + i);
        particleData.currentPositions[i3] = cx + (Math.sin(time * 6 + i * 0.5) * jitter);
        particleData.currentPositions[i3 + 1] = cy + (Math.cos(time * 6 + i * 0.5) * jitter);
        particleData.currentPositions[i3 + 2] = cz + (Math.sin(time * 8 + i) * jitter * 0.5);
      }

      dummy.position.set(
        particleData.currentPositions[i3],
        particleData.currentPositions[i3 + 1],
        particleData.currentPositions[i3 + 2]
      );

      const s = particleData.sizes[i] * (0.8 + 0.3 * Math.sin(time * 5 + i));
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;

    // Point light moves subtly across letters to produce dynamic metallic reflections
    if (pointLightRef.current) {
      pointLightRef.current.position.x = Math.sin(time * 1.5) * 3;
      pointLightRef.current.position.y = Math.cos(time * 1.2) * 1.2;
    }
  });

  return (
    <>
      {/* Cinematic Lighting Rig */}
      <ambientLight intensity={0.15} color="#1f0206" />
      
      {/* Intense Crimson Key Light */}
      <directionalLight
        position={[4, 5, 6]}
        intensity={2.8}
        color="#ff2b4c"
      />
      {/* Cool Specular Rim Light for Metallic Edge Highlights */}
      <directionalLight
        position={[-5, -3, 4]}
        intensity={1.4}
        color="#ffffff"
      />
      {/* Volumetric center point light */}
      <pointLight
        ref={pointLightRef}
        position={[0, 0, 3]}
        intensity={3.5}
        distance={10}
        color="#ff1a3d"
      />

      {/* Atmospheric Crimson Volumetric Fog Plane (Background) */}
      <mesh position={[0, 0, -2.5]} renderOrder={1}>
        <planeGeometry args={[14, 8]} />
        <meshBasicMaterial
          ref={hazeMaterialRef}
          map={hazeTexture}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Horizontal Light Sweep Plane */}
      <mesh ref={sweepMeshRef} position={[-10, 0, 0.4]} renderOrder={8}>
        <planeGeometry args={[2.5, 7]} />
        <meshBasicMaterial
          map={sweepTexture}
          transparent
          opacity={0.75}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* 3D Extruded JSR Group */}
      <group ref={jsrGroupRef} position={[0, 0, 0]}>
        <mesh geometry={jsrGeo} material={jsrMaterials} renderOrder={4} />
      </group>

      {/* 3D Extruded Full Name Group */}
      <group ref={nameGroupRef} position={[0, 0.25, 0.1]}>
        <mesh geometry={nameGeo} material={nameMaterials} renderOrder={5} />
      </group>

      {/* 3D Tagline Group */}
      <group ref={tagGroupRef} position={[0, -0.65, 0.1]}>
        <mesh geometry={tagGeo} material={tagMaterials} renderOrder={6} />
      </group>

      {/* Instanced Converging Embers / Particles */}
      <instancedMesh
        ref={particlesMeshRef}
        args={[undefined, undefined, PARTICLE_COUNT]}
        renderOrder={10}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial
          ref={particleMaterialRef}
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </instancedMesh>
    </>
  );
});
