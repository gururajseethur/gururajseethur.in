import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ── Performance-tuned constants ── */
const CYAN_COUNT = 80;
const RED_COUNT = 25;
const LINE_MAX_DIST_SQ = 8100;
const MAX_DIST = 90;
const REPEL_RADIUS = 120;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const BOUND = 250;

export default function ParticleCanvas({ containerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Renderer (conservative settings) ── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 300;
    const mouse = new THREE.Vector2(9999, 9999);
    let isPaused = false;

    /* ── Tab visibility → pause rendering ── */
    const onVisibility = () => { isPaused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    /* ── Helper: create particle system ── */
    function createParticles(count, color, size, opacity) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const vel = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 500;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 500;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
        vel[i * 3]     = (Math.random() - 0.5) * 0.3;
        vel[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
        vel[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color, size, transparent: true, opacity });
      scene.add(new THREE.Points(geo, mat));
      return { geo, mat, pos, vel };
    }

    const cyan = createParticles(CYAN_COUNT, 0x00D9FF, 1.5, 0.5);
    const red  = createParticles(RED_COUNT,  0xFF4444, 2.0, 0.3);

    /* ── Pre-allocated line geometry (avoids per-frame GC) ── */
    function createLineSystem(maxPairs, color, opacity) {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(maxPairs * 6);
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setDrawRange(0, 0);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.LineSegments(geo, mat);
      scene.add(mesh);
      return { geo, mat, positions };
    }

    const cyanLines = createLineSystem(CYAN_COUNT * (CYAN_COUNT - 1) / 2, 0x00D9FF, 0.08);
    const redLines  = createLineSystem(RED_COUNT  * (RED_COUNT  - 1) / 2, 0xFF4444, 0.08);

    /* ── Resize handler ── */
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Mouse tracking ── */
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const heroEl = containerRef.current;
    if (heroEl) heroEl.addEventListener('mousemove', onMouseMove);

    const raycaster = new THREE.Raycaster();
    const repelPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = new THREE.Vector3();

    /* ── Physics: drift + repel ── */
    function updateParticles(pos, vel, count) {
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(repelPlane, intersectPoint);
      const mx = intersectPoint.x, my = intersectPoint.y;

      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        pos[ix]     += vel[ix];
        pos[ix + 1] += vel[ix + 1];
        pos[ix + 2] += vel[ix + 2];

        // Wrap bounds
        if (pos[ix]     >  BOUND) pos[ix]     = -BOUND;
        if (pos[ix]     < -BOUND) pos[ix]     =  BOUND;
        if (pos[ix + 1] >  BOUND) pos[ix + 1] = -BOUND;
        if (pos[ix + 1] < -BOUND) pos[ix + 1] =  BOUND;

        // Cursor repulsion
        const dx = pos[ix] - mx;
        const dy = pos[ix + 1] - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * 1.2;
          pos[ix]     += (dx / dist) * force;
          pos[ix + 1] += (dy / dist) * force;
        }
      }
    }

    /* ── Lines: update pre-allocated buffer ── */
    function updateLines(particlePos, lineData, count) {
      let vi = 0;
      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const px = particlePos[ix];
        const py = particlePos[ix + 1];
        const pz = particlePos[ix + 2];

        for (let j = i + 1; j < count; j++) {
          const jx = j * 3;

          const dx = px - particlePos[jx];
          if (dx > MAX_DIST || dx < -MAX_DIST) continue;

          const dy = py - particlePos[jx + 1];
          if (dy > MAX_DIST || dy < -MAX_DIST) continue;

          const dz = pz - particlePos[jx + 2];
          if (dz > MAX_DIST || dz < -MAX_DIST) continue;

          if (dx * dx + dy * dy + dz * dz < LINE_MAX_DIST_SQ) {
            lineData.positions[vi++] = px;
            lineData.positions[vi++] = py;
            lineData.positions[vi++] = pz;
            lineData.positions[vi++] = particlePos[jx];
            lineData.positions[vi++] = particlePos[jx + 1];
            lineData.positions[vi++] = particlePos[jx + 2];
          }
        }
      }
      lineData.geo.setDrawRange(0, vi / 3);
      lineData.geo.attributes.position.needsUpdate = true;
    }

    /* ── Render loop (30 fps cap) ── */
    let lastFrame = 0;
    let animId;
    const animate = (now) => {
      animId = requestAnimationFrame(animate);
      if (isPaused) return;
      if (now - lastFrame < FRAME_INTERVAL) return;
      lastFrame = now;

      updateParticles(cyan.pos, cyan.vel, CYAN_COUNT);
      cyan.geo.attributes.position.needsUpdate = true;
      updateParticles(red.pos, red.vel, RED_COUNT);
      red.geo.attributes.position.needsUpdate = true;

      updateLines(cyan.pos, cyanLines, CYAN_COUNT);
      updateLines(red.pos, redLines, RED_COUNT);

      scene.rotation.z += 0.0002;
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', resize);
      if (heroEl) heroEl.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      [cyan, red].forEach(p => { p.geo.dispose(); p.mat.dispose(); });
      [cyanLines, redLines].forEach(l => { l.geo.dispose(); l.mat.dispose(); });
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 right-0 w-1/2 h-full"
      style={{ zIndex: 0 }}
    />
  );
}
