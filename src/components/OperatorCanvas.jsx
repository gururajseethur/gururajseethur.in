import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import NeuralParticles from './NeuralParticles';
import { useMasterClock } from '../context/ClockContext';
import { useDeviceDetect, getParticleCount, getDevicePixelRatio } from '../utils/device';

/**
 * OperatorCanvas — Route-aware 3D background.
 *
 * Each route gets a unique 3D scene:
 *   /          → Neural particle sphere (brain morphing)
 *   /projects  → Wireframe grid lattice
 *   /security  → Dark anomaly field (pulsing red nodes)
 *   /creative  → Flowing ribbon particles
 *   /contact   → Signal pulse ring
 *
 * Shared: Post-processing (Bloom, ChromaticAberration, Noise)
 */
export default function OperatorCanvas({ routeKey = '/' }) {
  const isMobile = useDeviceDetect();
  const { override } = useMasterClock();
  const particleCount = useMemo(() => getParticleCount(isMobile), [isMobile]);
  const dpr = getDevicePixelRatio(isMobile, override);

  return (
    <div className="canvas-container">
      <Canvas
        dpr={dpr}
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, 2, 8] }}
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
        <fogExp2 attach="fog" args={['#050505', 0.06]} />

        <directionalLight position={[5, 8, 3]} intensity={0.4} color="#b0c4de" />
        <ambientLight intensity={0.05} color="#1a1a2e" />

        {/* Route-specific 3D scene */}
        <Suspense fallback={null}>
          <RouteScene routeKey={routeKey} particleCount={particleCount} isMobile={isMobile} />
        </Suspense>

        {/* Post-processing */}
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

/* ─── Route Scene Selector ─── */
function RouteScene({ routeKey, particleCount, isMobile }) {
  switch (routeKey) {
    case '/':
      return (
        <group position={[0, 0, -2]}>
          <NeuralParticles count={particleCount} transition={0} />
        </group>
      );
    case '/projects':
      return <GridLattice count={isMobile ? 200 : 600} />;
    case '/security':
      return <AnomalyField count={isMobile ? 150 : 400} />;
    case '/creative':
      return <FlowingRibbons count={isMobile ? 300 : 800} />;
    case '/contact':
      return <SignalPulse count={isMobile ? 100 : 300} />;
    default:
      return (
        <group position={[0, 0, -2]}>
          <NeuralParticles count={particleCount} transition={0} />
        </group>
      );
  }
}

/* ─── /projects — Wireframe Grid Lattice ─── */
function GridLattice({ count }) {
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const gridSize = Math.cbrt(count);

    for (let i = 0; i < count; i++) {
      const x = ((i % gridSize) / gridSize - 0.5) * 12;
      const y = ((Math.floor(i / gridSize) % gridSize) / gridSize - 0.5) * 8;
      const z = ((Math.floor(i / (gridSize * gridSize))) / gridSize - 0.5) * 12 - 4;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Cyan with random brightness variation
      const brightness = 0.3 + Math.random() * 0.7;
      col[i * 3] = 0 * brightness;
      col[i * 3 + 1] = 0.95 * brightness;
      col[i * 3 + 2] = 1 * brightness;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const posArr = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const baseY = ((Math.floor(i / Math.cbrt(count)) % Math.cbrt(count)) / Math.cbrt(count) - 0.5) * 8;
      posArr[i * 3 + 1] = baseY + Math.sin(time * 0.5 + i * 0.1) * 0.15;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.03;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={2.5}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ─── /security — Dark Anomaly Field ─── */
function AnomalyField({ count }) {
  const pointsRef = useRef();

  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Scattered in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 6;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) - 1;
      pos[i * 3 + 2] = r * Math.cos(phi) - 4;

      // Mix of red and cyan nodes
      const isAlert = Math.random() < 0.3;
      col[i * 3] = isAlert ? 1.0 : 0.0;
      col[i * 3 + 1] = isAlert ? 0.19 : 0.95;
      col[i * 3 + 2] = isAlert ? 0.19 : 1.0;

      spd[i] = 0.5 + Math.random() * 2;
    }
    return { positions: pos, colors: col, speeds: spd };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const posArr = pointsRef.current.geometry.attributes.position.array;
    const colArr = pointsRef.current.geometry.attributes.color.array;

    for (let i = 0; i < count; i++) {
      // Subtle pulsing motion
      const s = speeds[i];
      posArr[i * 3] += Math.sin(time * s + i) * 0.002;
      posArr[i * 3 + 1] += Math.cos(time * s * 0.7 + i) * 0.002;

      // Alert nodes pulse brightness
      if (colArr[i * 3] > 0.5) {
        const pulse = 0.5 + Math.sin(time * 3 + i * 0.5) * 0.5;
        colArr[i * 3] = pulse;
        colArr[i * 3 + 1] = 0.19 * pulse;
        colArr[i * 3 + 2] = 0.19 * pulse;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={3}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── /creative — Flowing Ribbons ─── */
function FlowingRibbons({ count }) {
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const ribbonIndex = Math.floor(Math.random() * 5);
      const ribbonOffset = ribbonIndex * 1.5 - 3;

      pos[i * 3] = (t - 0.5) * 16;
      pos[i * 3 + 1] = ribbonOffset + Math.sin(t * Math.PI * 4) * 1.5;
      pos[i * 3 + 2] = -3 + Math.cos(t * Math.PI * 3) * 2;

      // Rainbow-ish gradient along ribbon
      const hue = t * 0.8 + ribbonIndex * 0.15;
      const r = Math.abs(Math.sin(hue * Math.PI * 2));
      const g = Math.abs(Math.sin((hue + 0.33) * Math.PI * 2));
      const b = Math.abs(Math.sin((hue + 0.66) * Math.PI * 2));

      col[i * 3] = r * 0.6;
      col[i * 3 + 1] = g * 0.8;
      col[i * 3 + 2] = b * 0.9;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const posArr = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const ribbonIndex = Math.floor(i / (count / 5));
      const ribbonOffset = ribbonIndex * 1.5 - 3;

      posArr[i * 3 + 1] = ribbonOffset + Math.sin(t * Math.PI * 4 + time * 0.8) * 1.5;
      posArr[i * 3 + 2] = -3 + Math.cos(t * Math.PI * 3 + time * 0.6) * 2;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── /contact — Signal Pulse Ring ─── */
function SignalPulse({ count }) {
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 3 + Math.random() * 0.3;

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = Math.sin(angle) * r - 4;

      // Green signal color
      col[i * 3] = 0.22;
      col[i * 3 + 1] = 1.0;
      col[i * 3 + 2] = 0.08;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const posArr = pointsRef.current.geometry.attributes.position.array;
    const colArr = pointsRef.current.geometry.attributes.color.array;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + time * 0.3;
      const pulseR = 3 + Math.sin(time * 2 + i * 0.1) * 0.5;

      posArr[i * 3] = Math.cos(angle) * pulseR;
      posArr[i * 3 + 2] = Math.sin(angle) * pulseR - 4;

      // Pulse brightness
      const brightness = 0.5 + Math.sin(time * 3 + i * 0.2) * 0.5;
      colArr[i * 3] = 0.22 * brightness;
      colArr[i * 3 + 1] = 1.0 * brightness;
      colArr[i * 3 + 2] = 0.08 * brightness;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={3}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
