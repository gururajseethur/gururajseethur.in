import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMasterClock } from '../context/ClockContext';
import { generateBrainPositions, generateGlobePositions, generateRandomAttribute } from '../utils/geometry';
import vertexShader from '../shaders/particles.vert?raw';
import fragmentShader from '../shaders/particles.frag?raw';

/**
 * Morphing Neural Engine
 *
 * 50,000 particles (8k mobile) via InstancedBufferGeometry.
 * Two position buffers: aPositionBrain, aPositionGlobe
 * Quintic smoothstep interpolation.
 * Divergence-free curl noise for governed motion.
 * Rogue particle: rare #FF3131 flash, self-corrects.
 */
export default function NeuralParticles({ count = 50000, transition = 0 }) {
  const meshRef = useRef();
  const { getDelta, overrideRef } = useMasterClock();

  const uniforms = useMemo(() => ({
    uTime: { value: 0.0 },
    uTransition: { value: 0.0 },
    uDeltaTime: { value: 0.016 },
    uColorBase: { value: new THREE.Color('#00F3FF') },
    uColorRogue: { value: new THREE.Color('#FF3131') },
    uRogueIndex: { value: -1.0 },
  }), []);

  // Rogue particle timer
  const rogueTimer = useRef(0);

  // Generate geometry data
  const { brainPositions, globePositions, randoms } = useMemo(() => {
    return {
      brainPositions: generateBrainPositions(count),
      globePositions: generateGlobePositions(count),
      randoms: generateRandomAttribute(count),
    };
  }, [count]);

  // Build geometry
  const geometry = useMemo(() => {
    const geo = new THREE.InstancedBufferGeometry();

    // Single point per instance
    geo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));

    // Instanced attributes
    geo.setAttribute('aPositionBrain', new THREE.InstancedBufferAttribute(brainPositions, 3));
    geo.setAttribute('aPositionGlobe', new THREE.InstancedBufferAttribute(globePositions, 3));
    geo.setAttribute('aRandom', new THREE.InstancedBufferAttribute(randoms, 1));

    geo.instanceCount = count;
    return geo;
  }, [brainPositions, globePositions, randoms, count]);

  // Material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [uniforms, vertexShader, fragmentShader]);

  // Per-frame update
  useFrame((state) => {
    const clockDelta = state.clock.getDelta();
    const dt = getDelta(clockDelta);

    // Update uniforms
    uniforms.uDeltaTime.value = dt;
    uniforms.uTransition.value = transition;

    if (dt > 0) {
      uniforms.uTime.value += dt;

      // Rogue particle: triggers every ~8-12 seconds for ~0.3s
      rogueTimer.current += dt;
      if (rogueTimer.current > 8 + Math.sin(uniforms.uTime.value) * 2) {
        uniforms.uRogueIndex.value = Math.floor(Math.abs(Math.sin(uniforms.uTime.value * 7.3)) * count);
        if (rogueTimer.current > 8 + Math.sin(uniforms.uTime.value) * 2 + 0.3) {
          // Self-correct
          uniforms.uRogueIndex.value = -1.0;
          rogueTimer.current = 0;
        }
      }
    }
  });

  return (
    <points ref={meshRef} geometry={geometry} material={material} frustumCulled={false} />
  );
}
