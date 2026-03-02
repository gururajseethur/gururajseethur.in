import React, { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;

function buildGalaxyDisc(count, color1Hex, color2Hex, size) {
  const positions = new Float32Array(count * 3);
  const colors    = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const c1 = new THREE.Color(color1Hex);
  const c2 = new THREE.Color(color2Hex);

  for (let i = 0; i < count; i++) {
    const angle  = i * goldenAngle;
    const radius = Math.sqrt(i / count) * 3.0;
    const spread = (Math.random() - 0.5) * 0.18;
    positions[i * 3]     = Math.cos(angle) * radius + spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
    positions[i * 3 + 2] = Math.sin(angle) * radius + spread;

    const t = radius / 3.0;
    const col = c1.clone().lerp(c2, Math.min(t, 1));
    colors[i * 3]     = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({
    size, vertexColors: true, transparent: true, opacity: 0.9,
    sizeAttenuation: true, depthWrite: false,
  });
  return new THREE.Points(geo, mat);
}

function BinaryStarSystem() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    if (IS_MOBILE) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1, 100
    );
    camera.position.set(0, 1.5, 8);

    /* ── Master group (mouse rotation target) ── */
    const master = new THREE.Group();
    scene.add(master);

    /* ── Star A: Red (creative) ── */
    const starA = buildGalaxyDisc(2000, '#FF3B3B', '#FF8080', 0.015);
    starA.position.set(-2.5, 0, 0);
    master.add(starA);

    /* ── Star B: Cyan (technical) ── */
    const starB = buildGalaxyDisc(1500, '#00D9FF', '#80EEFF', 0.012);
    starB.position.set(2.5, 0, 0);
    master.add(starB);

    /* ── Bridge particles ── */
    const bridgeCount = 300;
    const bridgePos   = new Float32Array(bridgeCount * 3);
    const bridgeCol   = new Float32Array(bridgeCount * 3);
    const p0 = new THREE.Vector3(-2.5, 0, 0);
    const p1 = new THREE.Vector3(0,    1, 0);
    const p2 = new THREE.Vector3(2.5,  0, 0);
    const tmp = new THREE.Vector3();
    for (let i = 0; i < bridgeCount; i++) {
      const t = i / (bridgeCount - 1);
      // Quadratic Bezier
      tmp.x = (1-t)*(1-t)*p0.x + 2*(1-t)*t*p1.x + t*t*p2.x;
      tmp.y = (1-t)*(1-t)*p0.y + 2*(1-t)*t*p1.y + t*t*p2.y + (Math.random()-0.5)*0.3;
      tmp.z = (1-t)*(1-t)*p0.z + 2*(1-t)*t*p1.z + t*t*p2.z + (Math.random()-0.5)*0.3;
      bridgePos[i*3]=tmp.x; bridgePos[i*3+1]=tmp.y; bridgePos[i*3+2]=tmp.z;
      bridgeCol[i*3]=1; bridgeCol[i*3+1]=1; bridgeCol[i*3+2]=1;
    }
    const bridgeGeo = new THREE.BufferGeometry();
    bridgeGeo.setAttribute('position', new THREE.BufferAttribute(bridgePos, 3));
    bridgeGeo.setAttribute('color',    new THREE.BufferAttribute(bridgeCol, 3));
    const bridgeMat = new THREE.PointsMaterial({
      size: 0.008, vertexColors: true, transparent: true,
      opacity: 0.35, depthWrite: false,
    });
    const bridge = new THREE.Points(bridgeGeo, bridgeMat);
    master.add(bridge);

    /* ── Central icosahedron ── */
    const icoGeo = new THREE.IcosahedronGeometry(0.6, 2);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, wireframe: true, transparent: true, opacity: 0.08,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    master.add(ico);

    /* ── Energy rings ── */
    function makeRing(r, col, opacity) {
      const geo = new THREE.TorusGeometry(r, 0.003, 8, 100);
      const mat = new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity,
      });
      return new THREE.Mesh(geo, mat);
    }
    const ring1 = makeRing(0.8,  0xFF3B3B, 0.5);
    const ring2 = makeRing(1.1,  0xffffff, 0.2);
    const ring3 = makeRing(1.5,  0x00D9FF, 0.4);
    master.add(ring1, ring2, ring3);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.05));
    const centerPt = new THREE.PointLight(0xffffff, 3, 5);
    centerPt.position.set(0, 0, 0);
    scene.add(centerPt);
    const redPt = new THREE.PointLight(0xFF3B3B, 2, 12);
    redPt.position.set(-5, 2, 3);
    scene.add(redPt);
    const cyanPt = new THREE.PointLight(0x00D9FF, 2, 12);
    cyanPt.position.set(5, -2, 3);
    scene.add(cyanPt);

    /* ── Mouse ── */
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth  - 0.5);
      mouse.targetY = (e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── Click burst ── */
    let burstActive = false;
    let burstT = 0;
    const origPosA = starA.geometry.attributes.position.array.slice();
    const origPosB = starB.geometry.attributes.position.array.slice();
    const onClick = () => {
      burstActive = true; burstT = 0;
    };
    window.addEventListener('click', onClick);

    /* ── Resize ── */
    const onResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', onResize);

    /* ── Animate ── */
    let frameId;
    let opacity = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Fade in
      if (opacity < 1) { opacity = Math.min(1, opacity + 0.012); renderer.domElement.style.opacity = opacity; }

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      master.rotation.y = mouse.x * 0.8;
      master.rotation.x = mouse.y * 0.5;

      // Star rotations
      starA.rotation.y += 0.0008;
      starB.rotation.y -= 0.001;

      // Bridge pulse
      bridgeMat.opacity = 0.1 + Math.sin(t * 2) * 0.25;

      // Ico
      ico.rotation.y += 0.005;
      ico.rotation.x += 0.003;
      ico.rotation.z += 0.001;
      const scale = 0.9 + Math.sin(t * 1.2) * 0.15;
      ico.scale.setScalar(scale);

      // Rings
      ring1.rotation.y += 0.006;
      ring2.rotation.x -= 0.004;
      ring3.rotation.z += 0.003;

      // Burst
      if (burstActive) {
        burstT += 0.016;
        const burstle = Math.min(burstT / 2.0, 1);
        const ease = burstT < 1.0 ? (1 - burstle) * 0.3 : 0;
        // Scatter -> settle: done via opacity flash
        bridgeMat.opacity = 0.6 * (1 - burstT / 2.5);
        if (burstT > 2.5) { burstActive = false; burstT = 0; }
      }

      renderer.render(scene, camera);
    };

    renderer.domElement.style.opacity = '0';
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (IS_MOBILE) return null;

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}

export default memo(BinaryStarSystem);
