import React, { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';
import { useSignalEngine } from '../../context/SignalEngineContext';

function SignalEngineScene() {
  const mountRef = useRef(null);
  const { sceneState, coreIntensity } = useSignalEngine();
  const stateRef = useRef({ sceneState, coreIntensity });

  useEffect(() => {
    stateRef.current = { sceneState, coreIntensity };
  }, [sceneState, coreIntensity]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // ── SCENE & RENDERER SETUP ──────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070c, 0.075);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x05070c, 0);
    container.appendChild(renderer.domElement);

    // ── LIGHTING ────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x0a1020, 1.2);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x59e1ff, 2.8, 18);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const cobaltFill = new THREE.PointLight(0x5276ff, 2.0, 22);
    cobaltFill.position.set(-4, 3, 2);
    scene.add(cobaltFill);

    const amberKey = new THREE.PointLight(0xffb65c, 1.4, 16);
    amberKey.position.set(4, -2.5, 3);
    scene.add(amberKey);

    // ── INTELLIGENCE CORE: DUAL NESTED POLYHEDRA ────────────────────────
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner glowing nucleus
    const innerGeo = new THREE.OctahedronGeometry(0.72, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x5276ff,
      emissive: 0x3857d8,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: false,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // Mid crystalline cage
    const midGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const midMat = new THREE.MeshStandardMaterial({
      color: 0x59e1ff,
      emissive: 0x18b7db,
      emissiveIntensity: 0.35,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const midCage = new THREE.Mesh(midGeo, midMat);
    coreGroup.add(midCage);

    // Outer lattice shield
    const outerGeo = new THREE.IcosahedronGeometry(1.65, 0);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x5276ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const outerLattice = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerLattice);

    // ── ORBITAL MECHANICAL RINGS ────────────────────────────────────────
    const ringsGroup = new THREE.Group();
    coreGroup.add(ringsGroup);

    // Equatorial Ring
    const ring1Geo = new THREE.RingGeometry(2.25, 2.29, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x59e1ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.3;
    ringsGroup.add(ring1);

    // Polar Aperture Ring (Warm Amber Film/Lens reference)
    const ring2Geo = new THREE.RingGeometry(2.75, 2.80, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xffb65c,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 4.5;
    ring2.rotation.y = Math.PI / 3;
    ringsGroup.add(ring2);

    // Outer Diagnostic Boundary
    const ring3Geo = new THREE.RingGeometry(3.35, 3.38, 96);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x5276ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -Math.PI / 3.2;
    ringsGroup.add(ring3);

    // ── NETWORK NODES & CONNECTION HIGHWAYS ──────────────────────────────
    const nodeCount = isMobile ? 18 : 36;
    const nodePositions = [];
    const nodeRadius = 3.6;

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = THREE.MathUtils.lerp(1.8, nodeRadius, Math.random());
      const sinPhi = Math.sin(phi);

      nodePositions.push(new THREE.Vector3(
        r * sinPhi * Math.cos(theta),
        r * sinPhi * Math.sin(theta) * 0.7,
        r * Math.cos(phi)
      ));
    }

    // Node markers
    const nodeGeo = new THREE.BufferGeometry();
    const nodeFloatArr = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      nodeFloatArr[i * 3]     = nodePositions[i].x;
      nodeFloatArr[i * 3 + 1] = nodePositions[i].y;
      nodeFloatArr[i * 3 + 2] = nodePositions[i].z;
    }
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodeFloatArr, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0x59e1ff,
      size: isMobile ? 0.08 : 0.12,
      transparent: true,
      opacity: 0.85,
    });
    const nodeCloud = new THREE.Points(nodeGeo, nodeMat);
    coreGroup.add(nodeCloud);

    // Connecting Network Paths
    const lineIndices = [];
    const maxDistance = 2.4;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < maxDistance) {
          lineIndices.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
          lineIndices.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
        }
      }
    }
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineIndices, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x5276ff,
      transparent: true,
      opacity: 0.18,
    });
    const networkLines = new THREE.LineSegments(linesGeo, linesMat);
    coreGroup.add(networkLines);

    // ── ATMOSPHERIC DATA PARTICLES ──────────────────────────────────────
    const particleCount = isMobile ? 180 : 420;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const cCobalt = new THREE.Color(0x5276ff);
    const cCyan = new THREE.Color(0x59e1ff);
    const cAmber = new THREE.Color(0xffb65c);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3]     = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 18;

      // Varied palette: 60% cobalt/cyan, 20% amber, 20% white
      const rnd = Math.random();
      let chosenColor = cCobalt;
      if (rnd < 0.45) chosenColor = cCyan;
      else if (rnd < 0.75) chosenColor = cCobalt;
      else if (rnd < 0.90) chosenColor = cAmber;
      else chosenColor = new THREE.Color(0xf2f5ff);

      particleColors[i * 3]     = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.04 : 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // ── MOUSE & SCROLL STATE REFS ───────────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scroll = { current: 0, target: 0 };

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      scroll.target = window.scrollY / maxScroll;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── RESIZE HANDLER ──────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── CAMERA STATE DEFINITIONS ────────────────────────────────────────
    const STATE_CONFIGS = {
      arrival: {
        pos: new THREE.Vector3(0, 0, 7.5),
        lookAt: new THREE.Vector3(0, 0, 0),
        corePos: new THREE.Vector3(0, 0, 0),
        amberIntensity: 1.2,
        cyanIntensity: 2.8,
        rotSpeed: 0.6,
      },
      security: {
        pos: new THREE.Vector3(1.6, -0.3, 6.2),
        lookAt: new THREE.Vector3(0.4, 0, 0),
        corePos: new THREE.Vector3(0.8, 0.2, 0),
        amberIntensity: 0.6,
        cyanIntensity: 4.0,
        rotSpeed: 0.85,
      },
      creative: {
        pos: new THREE.Vector3(-1.8, 0.4, 6.4),
        lookAt: new THREE.Vector3(-0.3, 0, 0),
        corePos: new THREE.Vector3(-0.9, -0.1, 0),
        amberIntensity: 3.2,
        cyanIntensity: 1.8,
        rotSpeed: 0.7,
      },
      'ai-lab': {
        pos: new THREE.Vector3(0.6, -0.8, 5.8),
        lookAt: new THREE.Vector3(0, -0.2, 0),
        corePos: new THREE.Vector3(0.2, -0.4, 0.5),
        amberIntensity: 1.5,
        cyanIntensity: 3.6,
        rotSpeed: 1.1,
      },
      journey: {
        pos: new THREE.Vector3(-1.2, -1.2, 7.0),
        lookAt: new THREE.Vector3(-0.2, -0.5, 0),
        corePos: new THREE.Vector3(-0.4, -0.6, -0.5),
        amberIntensity: 2.0,
        cyanIntensity: 2.4,
        rotSpeed: 0.5,
      },
      contact: {
        pos: new THREE.Vector3(0, -0.5, 6.5),
        lookAt: new THREE.Vector3(0, -0.1, 0),
        corePos: new THREE.Vector3(0, 0.3, 0),
        amberIntensity: 1.8,
        cyanIntensity: 3.0,
        rotSpeed: 0.4,
      },
    };

    // ── ANIMATION LOOP ──────────────────────────────────────────────────
    let animationFrameId;
    let lastTime = performance.now();
    const startTime = performance.now();
    const currentCamPos = camera.position.clone();
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      // Smooth inputs
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scroll.current += (scroll.target - scroll.current) * 0.08;

      const currentState = stateRef.current.sceneState || 'arrival';
      const config = STATE_CONFIGS[currentState] || STATE_CONFIGS.arrival;
      const intensity = stateRef.current.coreIntensity || 1.0;

      if (!prefersReducedMotion) {
        // Continuous organic rotation with differential axes
        const speedMultiplier = config.rotSpeed;
        innerCore.rotation.x += delta * 0.45 * speedMultiplier;
        innerCore.rotation.y += delta * 0.65 * speedMultiplier;

        midCage.rotation.x -= delta * 0.30 * speedMultiplier;
        midCage.rotation.y += delta * 0.40 * speedMultiplier;
        midCage.rotation.z += delta * 0.20 * speedMultiplier;

        outerLattice.rotation.y += delta * 0.15 * speedMultiplier;
        outerLattice.rotation.z -= delta * 0.12 * speedMultiplier;

        ring1.rotation.z += delta * 0.25 * speedMultiplier;
        ring2.rotation.z -= delta * 0.20 * speedMultiplier;
        ring3.rotation.z += delta * 0.15 * speedMultiplier;

        nodeCloud.rotation.y += delta * 0.12 * speedMultiplier;
        networkLines.rotation.y += delta * 0.12 * speedMultiplier;

        // Gentle breathing pulsation
        const pulse = Math.sin(elapsed * 2.2) * 0.08 + 1.0;
        innerCore.scale.setScalar(pulse * intensity);
        coreLight.intensity = (config.cyanIntensity * 0.8 + pulse * 0.4) * intensity;
        amberKey.intensity = config.amberIntensity * intensity;

        // Particle field subtle drift
        particleField.rotation.y = elapsed * 0.025 + scroll.current * 0.5;
        particleField.rotation.x = Math.sin(elapsed * 0.015) * 0.08;
      }

      // Smooth camera interpolation toward target state with mouse & scroll offsets
      const targetPos = config.pos.clone();
      targetPos.x += mouse.x * 0.45;
      targetPos.y += mouse.y * 0.35 - scroll.current * 2.2;
      targetPos.z -= scroll.current * 0.8;

      currentCamPos.lerp(targetPos, 0.04);
      camera.position.copy(currentCamPos);

      const targetLook = config.lookAt.clone();
      targetLook.y -= scroll.current * 1.5;
      currentLookAt.lerp(targetLook, 0.04);
      camera.lookAt(currentLookAt);

      // Core group target positioning
      coreGroup.position.lerp(config.corePos, 0.04);

      renderer.render(scene, camera);
    };

    animate();

    // ── CLEANUP ─────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      // Dispose geometries and materials
      [innerGeo, midGeo, outerGeo, ring1Geo, ring2Geo, ring3Geo, nodeGeo, linesGeo, particleGeo].forEach(g => g.dispose());
      [innerMat, midMat, outerMat, ring1Mat, ring2Mat, ring3Mat, nodeMat, linesMat, particleMat].forEach(m => m.dispose());
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'transparent',
      }}
    />
  );
}

export default memo(SignalEngineScene);
