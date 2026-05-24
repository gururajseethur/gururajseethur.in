import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { createGlobalStarfield } from './three/GlobalStarfield';
import { createGlobalCoreRings } from './three/GlobalCoreRings';
import { createGlobalKeyframes } from './three/GlobalKeyframes';
import { createGlobalNetwork } from './three/GlobalNetwork';

const MOBILE_MAX_POINTS = 120;
const DESKTOP_MAX_POINTS = 260;
const KEYFRAME_COUNT = 28;
const NETWORK_NODES_MOBILE = 20;
const NETWORK_NODES_DESKTOP = 42;
const PACKETS_MOBILE = 10;
const PACKETS_DESKTOP = 20;
const LINK_DISTANCE = 4.2;

const ROUTE_STYLE = {
  '/': { colorA: 0x00d9ff, colorB: 0xff4444, speed: 0.18, noise: 0.12 },
  '/projects': { colorA: 0x00d9ff, colorB: 0x5ab3ff, speed: 0.14, noise: 0.09 },
  '/security': { colorA: 0xff4444, colorB: 0x00d9ff, speed: 0.22, noise: 0.16 },
  '/creative': { colorA: 0x00d9ff, colorB: 0xff4444, speed: 0.2, noise: 0.14 },
  '/blog': { colorA: 0x00d9ff, colorB: 0x7a7fff, speed: 0.12, noise: 0.08 },
  '/videos': { colorA: 0x00d9ff, colorB: 0xff4444, speed: 0.16, noise: 0.1 },
  '/contact': { colorA: 0x00d9ff, colorB: 0x22c55e, speed: 0.2, noise: 0.12 },
};

function getStyle(pathname) {
  if (pathname.startsWith('/blog')) return ROUTE_STYLE['/blog'];
  return ROUTE_STYLE[pathname] || ROUTE_STYLE['/'];
}

export default function Global3DBackground({ routeKey = '/' }) {
  const canvasRef = useRef(null);
  const style = useMemo(() => getStyle(routeKey), [routeKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    const pointCount = isMobile ? MOBILE_MAX_POINTS : DESKTOP_MAX_POINTS;
    const networkNodeCount = isMobile ? NETWORK_NODES_MOBILE : NETWORK_NODES_DESKTOP;
    const packetCount = isMobile ? PACKETS_MOBILE : PACKETS_DESKTOP;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 1200);
    camera.position.set(0, 0, 24);

    const group = new THREE.Group();
    scene.add(group);

    const starfield = createGlobalStarfield(pointCount, style, isMobile);
    group.add(starfield.mesh);

    const coreRings = createGlobalCoreRings(style, isMobile);
    group.add(coreRings.mesh);

    const keyframes = createGlobalKeyframes(KEYFRAME_COUNT, style, isMobile);
    group.add(keyframes.mesh);

    const network = createGlobalNetwork(networkNodeCount, packetCount, LINK_DISTANCE, style, isMobile);
    group.add(network.mesh);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener('resize', resize);

    let frameId = 0;
    let start = performance.now();

    const animate = (t) => {
      const elapsed = (t - start) * 0.001;

      starfield.update(elapsed, style);

      group.rotation.y = elapsed * style.speed * 0.32;
      group.rotation.x = Math.sin(elapsed * 0.26) * 0.14;

      coreRings.update(elapsed, style);
      keyframes.update(elapsed, style);
      network.update(elapsed, style);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      starfield.dispose();
      coreRings.dispose();
      keyframes.dispose();
      network.dispose();
      renderer.dispose();
    };
  }, [style]);

  return (
    <div className="global-3d-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="global-3d-canvas" />
      <div className="global-3d-vignette" />
    </div>
  );
}
