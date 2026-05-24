import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/** Generates positions for N particles on a sphere of given radius */
function spherePositions(count, radius) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = radius * Math.cos(phi);
  }
  return pos;
}

const ParticleUniverse = React.memo(function ParticleUniverse() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* ── Scene + Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 7;

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));
    const cyanLight = new THREE.PointLight(0x00d9ff, 2, 10);
    cyanLight.position.set(3, 3, 3);
    scene.add(cyanLight);
    const redLight = new THREE.PointLight(0xff4444, 1.5, 10);
    redLight.position.set(-3, -3, -3);
    scene.add(redLight);
    const topLight = new THREE.PointLight(0xffffff, 0.5);
    topLight.position.set(0, 5, 0);
    scene.add(topLight);

    /* ── Master group (mouse rotation) ── */
    const master = new THREE.Group();
    scene.add(master);

    /* ── Sphere 1: CYAN 300 particles, radius 2.5 ── */
    const cyanGroup = new THREE.Group();
    master.add(cyanGroup);
    const cyanGeo = new THREE.BufferGeometry();
    cyanGeo.setAttribute('position', new THREE.BufferAttribute(spherePositions(300, 2.5), 3));
    cyanGroup.add(new THREE.Points(
      cyanGeo,
      new THREE.PointsMaterial({
        color: 0x00d9ff, size: 0.02, transparent: true, opacity: 0.75,
        depthWrite: false, blending: THREE.AdditiveBlending,
      })
    ));

    /* ── Sphere 2: RED 150 particles, radius 1.8, tilted 45deg Z ── */
    const redGroup = new THREE.Group();
    redGroup.rotation.z = Math.PI / 4; // 45 degrees
    master.add(redGroup);
    const redGeo = new THREE.BufferGeometry();
    redGeo.setAttribute('position', new THREE.BufferAttribute(spherePositions(150, 1.8), 3));
    redGroup.add(new THREE.Points(
      redGeo,
      new THREE.PointsMaterial({
        color: 0xff4444, size: 0.025, transparent: true, opacity: 0.65,
        depthWrite: false, blending: THREE.AdditiveBlending,
      })
    ));

    /* ── Central Icosahedron: wireframe, radius 1.2 ── */
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 2),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.06 })
    );
    master.add(ico);

    /* ── Energy Rings (3) ── */
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.004, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0x00d9ff, transparent: true, opacity: 0.4 })
    );
    master.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.4, 0.003, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0xff4444, transparent: true, opacity: 0.3 })
    );
    ring2.rotation.x = Math.PI / 2;
    master.add(ring2);

    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.005, 16, 120),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 })
    );
    ring3.rotation.y = Math.PI / 4;
    master.add(ring3);

    /* ── Shooting Particles (20) ── */
    const SHOOT_COUNT = 20;
    const shootPositions = new Float32Array(SHOOT_COUNT * 3);
    const shootVelocities = [];
    const shootColors = [];
    for (let i = 0; i < SHOOT_COUNT; i++) {
      // Start near center
      shootPositions[i * 3]     = (Math.random() - 0.5) * 1.5;
      shootPositions[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      shootPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      const speed = 0.02 + Math.random() * 0.04;
      const dir = new THREE.Vector3(
        (Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)
      ).normalize().multiplyScalar(speed);
      shootVelocities.push(dir);
      shootColors.push(i % 2 === 0 ? 0x00d9ff : 0xff4444);
    }
    const shootGeo = new THREE.BufferGeometry();
    shootGeo.setAttribute('position', new THREE.BufferAttribute(shootPositions, 3));
    // Build per-particle color attribute
    const shootColorArr = new Float32Array(SHOOT_COUNT * 3);
    shootColors.forEach((hex, i) => {
      const c = new THREE.Color(hex);
      shootColorArr[i * 3] = c.r;
      shootColorArr[i * 3 + 1] = c.g;
      shootColorArr[i * 3 + 2] = c.b;
    });
    shootGeo.setAttribute('color', new THREE.BufferAttribute(shootColorArr, 3));
    const shootPoints = new THREE.Points(
      shootGeo,
      new THREE.PointsMaterial({
        vertexColors: true, size: 0.03, transparent: true, opacity: 0.9,
        depthWrite: false, blending: THREE.AdditiveBlending,
      })
    );
    scene.add(shootPoints); // NOT in master group — shoots in world space

    /* ── Mouse ── */
    const mouse = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 };
    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── Resize ── */
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    /* ── Animate ── */
    const clock = new THREE.Clock();
    let raf;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Lerp mouse
      mouse.currentX += (mouse.targetX * 0.6 - mouse.currentX) * 0.05;
      mouse.currentY += (mouse.targetY * 0.4 - mouse.currentY) * 0.05;

      // Master group follows mouse
      master.rotation.y = mouse.currentX;
      master.rotation.x = mouse.currentY;

      // Cyan sphere: clockwise on Y
      cyanGroup.rotation.y += 0.001;
      // Breathing cyan
      const cyanScale = 0.9 + Math.sin(t * 0.4) * 0.1;
      cyanGroup.scale.setScalar(cyanScale);

      // Red sphere: counter-clockwise on Y
      redGroup.rotation.y -= 0.0015;
      // Breathing red (offset phase)
      const redScale = 0.9 + Math.sin(t * 0.4 + Math.PI) * 0.1;
      redGroup.scale.setScalar(redScale);

      // Icosahedron steady rotation
      ico.rotation.y += 0.003;
      ico.rotation.x += 0.001;

      // Rings
      ring1.rotation.y += 0.004;
      ring2.rotation.x -= 0.003;
      ring3.rotation.z += 0.002;

      // Shooting particles
      const sp = shootGeo.attributes.position.array;
      for (let i = 0; i < SHOOT_COUNT; i++) {
        const idx = i * 3;
        sp[idx]     += shootVelocities[i].x;
        sp[idx + 1] += shootVelocities[i].y;
        sp[idx + 2] += shootVelocities[i].z;
        // Reset when they exit boundary radius 5
        const dist = Math.sqrt(sp[idx] ** 2 + sp[idx + 1] ** 2 + sp[idx + 2] ** 2);
        if (dist > 5) {
          sp[idx]     = (Math.random() - 0.5) * 1.5;
          sp[idx + 1] = (Math.random() - 0.5) * 1.5;
          sp[idx + 2] = (Math.random() - 0.5) * 1.5;
          const speed = 0.02 + Math.random() * 0.04;
          shootVelocities[i].set(
            (Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)
          ).normalize().multiplyScalar(speed);
        }
      }
      shootGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    />
  );
});

export default ParticleUniverse;
