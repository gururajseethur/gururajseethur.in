import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import NeuralParticles from './NeuralParticles';
import CameraPath from './CameraPath';
import { useMasterClock } from '../context/ClockContext';
import { useDeviceDetect, getParticleCount, getDevicePixelRatio } from '../utils/device';

/**
 * Scene3D — Canvas container.
 *
 * Phase 1: Blank canvas at flat 60fps.
 * Phase 2: Particle engine layered on stable baseline.
 * Post-processing: Selective Bloom + minimal Chromatic Aberration + subtle Noise.
 *
 * Override mode disables EffectComposer passes and drops pixelRatio.
 */
export default function Scene3D({ scrollProgress = 0, transition = 0 }) {
  const isMobile = useDeviceDetect();
  const { override } = useMasterClock();
  const particleCount = useMemo(() => getParticleCount(isMobile), [isMobile]);
  const dpr = getDevicePixelRatio(isMobile, override);

  return (
    <div className="canvas-container">
      <Canvas
        dpr={dpr}
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, 6, 8] }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050505');
          gl.toneMapping = THREE.NoToneMapping;
        }}
        frameloop="always"
      >
        {/* Fog for infinite depth */}
        <fogExp2 attach="fog" args={['#050505', 0.08]} />

        {/* Cold directional lighting */}
        <directionalLight
          position={[5, 8, 3]}
          intensity={0.4}
          color="#b0c4de"
        />
        <ambientLight intensity={0.05} color="#1a1a2e" />

        {/* Camera path — governed by scroll */}
        <CameraPath isMobile={isMobile} />

        {/* Particle engine — pushed back on Z for atmospheric depth */}
        <group position={[0, 0, -2]}>
          <Suspense fallback={null}>
            <NeuralParticles count={particleCount} transition={transition} />
          </Suspense>
        </group>

        {/* Post-processing — disabled during Override */}
        {!override && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.3}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new THREE.Vector2(0.0005, 0.0005)}
              radialModulation={false}
              modulationOffset={0}
            />
            <Noise
              blendFunction={BlendFunction.OVERLAY}
              opacity={0.04}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
