import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

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

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pointCount * 3);
    const seeds = new Float32Array(pointCount);

    for (let i = 0; i < pointCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const b = Math.acos(2 * Math.random() - 1);
      const r = 6 + Math.random() * 8;
      positions[i * 3] = r * Math.sin(b) * Math.cos(a);
      positions[i * 3 + 1] = r * Math.sin(b) * Math.sin(a);
      positions[i * 3 + 2] = r * Math.cos(b);
      seeds[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: style.colorA,
        size: isMobile ? 0.11 : 0.09,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    group.add(points);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(isMobile ? 2.8 : 3.3, 1),
      new THREE.MeshBasicMaterial({
        color: style.colorB,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      })
    );
    group.add(core);

    const scanRing = new THREE.Mesh(
      new THREE.RingGeometry(6.5, 6.9, 96),
      new THREE.MeshBasicMaterial({
        color: style.colorA,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.11,
      })
    );
    scanRing.rotation.x = Math.PI * 0.5;
    group.add(scanRing);

    const timelineRing = new THREE.Mesh(
      new THREE.TorusGeometry(isMobile ? 7 : 7.8, 0.035, 10, 120),
      new THREE.MeshBasicMaterial({
        color: style.colorB,
        transparent: true,
        opacity: 0.2,
      })
    );
    timelineRing.rotation.x = Math.PI * 0.5;
    group.add(timelineRing);

    const keyframeGroup = new THREE.Group();
    const keyframeGeometry = new THREE.BoxGeometry(0.28, 0.07, 0.07);
    const keyframeMaterial = new THREE.MeshBasicMaterial({
      color: style.colorB,
      transparent: true,
      opacity: 0.58,
    });
    const keyframes = [];
    const timelineRadius = isMobile ? 7 : 7.8;

    for (let i = 0; i < KEYFRAME_COUNT; i++) {
      const theta = (i / KEYFRAME_COUNT) * Math.PI * 2;
      const block = new THREE.Mesh(keyframeGeometry, keyframeMaterial);
      block.position.set(
        Math.cos(theta) * timelineRadius,
        Math.sin(theta) * timelineRadius,
        Math.sin(theta * 4) * 0.16
      );
      block.lookAt(0, 0, block.position.z);
      keyframeGroup.add(block);
      keyframes.push({ mesh: block, phase: Math.random() * Math.PI * 2 });
    }

    keyframeGroup.rotation.x = Math.PI * 0.5;
    group.add(keyframeGroup);

    const networkGroup = new THREE.Group();
    const networkPositions = new Float32Array(networkNodeCount * 3);
    const networkSeeds = new Float32Array(networkNodeCount);

    for (let i = 0; i < networkNodeCount; i++) {
      const theta = (i / networkNodeCount) * Math.PI * 2;
      const radius = (isMobile ? 5.4 : 6.1) + Math.sin(theta * 3) * 0.55 + (Math.random() - 0.5) * 0.45;
      networkPositions[i * 3] = Math.cos(theta) * radius;
      networkPositions[i * 3 + 1] = Math.sin(theta) * radius;
      networkPositions[i * 3 + 2] = (Math.random() - 0.5) * 1.6;
      networkSeeds[i] = Math.random() * Math.PI * 2;
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(networkPositions, 3));
    const nodeMaterial = new THREE.PointsMaterial({
      color: style.colorA,
      size: isMobile ? 0.16 : 0.13,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    networkGroup.add(nodePoints);

    const links = [];
    const LINK_DISTANCE_SQ = LINK_DISTANCE * LINK_DISTANCE;
    const invCellSize = 1 / LINK_DISTANCE;
    const gridMap = new Map();

    for (let i = 0; i < networkNodeCount; i++) {
      const cx = (Math.floor(networkPositions[i * 3] * invCellSize) + 512) & 1023;
      const cy = (Math.floor(networkPositions[i * 3 + 1] * invCellSize) + 512) & 1023;
      const cz = (Math.floor(networkPositions[i * 3 + 2] * invCellSize) + 512) & 1023;

      const key = cx | (cy << 10) | (cz << 20);
      let cell = gridMap.get(key);
      if (!cell) {
        gridMap.set(key, [i]);
      } else {
        cell.push(i);
      }
    }

    for (let i = 0; i < networkNodeCount; i++) {
      const x = networkPositions[i * 3];
      const y = networkPositions[i * 3 + 1];
      const z = networkPositions[i * 3 + 2];

      const cx = (Math.floor(x * invCellSize) + 512) & 1023;
      const cy = (Math.floor(y * invCellSize) + 512) & 1023;
      const cz = (Math.floor(z * invCellSize) + 512) & 1023;

      for (let ox = -1; ox <= 1; ox++) {
        for (let oy = -1; oy <= 1; oy++) {
          for (let oz = -1; oz <= 1; oz++) {
            const key = ((cx + ox) & 1023) | (((cy + oy) & 1023) << 10) | (((cz + oz) & 1023) << 20);

            let cell = gridMap.get(key);
            if (cell) {
              for (let k = 0; k < cell.length; k++) {
                const j = cell[k];
                if (j > i) {
                  const dx = x - networkPositions[j * 3];
                  const dy = y - networkPositions[j * 3 + 1];
                  const dz = z - networkPositions[j * 3 + 2];
                  if (dx * dx + dy * dy + dz * dz < LINK_DISTANCE_SQ) {
                    links.push([i, j]);
                  }
                }
              }
            }
          }
        }
      }
    }

    const linkPositions = new Float32Array(links.length * 6);
    const linkGeometry = new THREE.BufferGeometry();
    linkGeometry.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3));
    const linkMaterial = new THREE.LineBasicMaterial({
      color: style.colorB,
      transparent: true,
      opacity: 0.24,
    });
    const linkSegments = new THREE.LineSegments(linkGeometry, linkMaterial);
    networkGroup.add(linkSegments);

    const packetGeometry = new THREE.SphereGeometry(isMobile ? 0.06 : 0.07, 10, 10);
    const packetMaterial = new THREE.MeshBasicMaterial({
      color: style.colorB,
      transparent: true,
      opacity: 0.9,
    });
    const packets = [];
    for (let i = 0; i < packetCount; i++) {
      const edgeIndex = Math.floor(Math.random() * Math.max(links.length, 1));
      const mesh = new THREE.Mesh(packetGeometry, packetMaterial);
      networkGroup.add(mesh);
      packets.push({
        mesh,
        edgeIndex,
        progress: Math.random(),
        speed: 0.25 + Math.random() * 0.55,
      });
    }

    const sweepMesh = new THREE.Mesh(
      new THREE.RingGeometry(0.1, isMobile ? 6.9 : 7.7, 64, 1, 0, Math.PI / 7),
      new THREE.MeshBasicMaterial({
        color: style.colorA,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.12,
      })
    );
    sweepMesh.rotation.x = Math.PI * 0.5;
    networkGroup.add(sweepMesh);

    networkGroup.rotation.x = Math.PI * 0.5;
    group.add(networkGroup);

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

      for (let i = 0; i < pointCount; i++) {
        const idx = i * 3;
        const w = elapsed * style.speed + seeds[i];
        const drift = Math.sin(w) * style.noise;
        positions[idx] += Math.cos(w * 0.37) * 0.002 + drift * 0.0007;
        positions[idx + 1] += Math.sin(w * 0.31) * 0.002;
        positions[idx + 2] += Math.cos(w * 0.23) * 0.0014;
      }

      geometry.attributes.position.needsUpdate = true;
      group.rotation.y = elapsed * style.speed * 0.32;
      group.rotation.x = Math.sin(elapsed * 0.26) * 0.14;
      core.rotation.x += 0.002;
      core.rotation.y -= 0.0018;
      scanRing.rotation.z += 0.0036;
      timelineRing.rotation.z -= 0.0022;
      keyframeGroup.rotation.z += 0.0032;
      networkGroup.rotation.z -= 0.0018;
      sweepMesh.rotation.z += 0.014;
      sweepMesh.material.opacity = 0.08 + (Math.sin(elapsed * 2.4) + 1) * 0.035;

      for (let i = 0; i < networkNodeCount; i++) {
        const idx = i * 3;
        const w = elapsed * (style.speed * 0.8) + networkSeeds[i];
        networkPositions[idx] += Math.sin(w * 0.9) * 0.0018;
        networkPositions[idx + 1] += Math.cos(w * 0.7) * 0.0016;
        networkPositions[idx + 2] = Math.sin(w * 0.5) * 0.8;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      for (let i = 0; i < links.length; i++) {
        const [a, b] = links[i];
        const li = i * 6;
        linkPositions[li] = networkPositions[a * 3];
        linkPositions[li + 1] = networkPositions[a * 3 + 1];
        linkPositions[li + 2] = networkPositions[a * 3 + 2];
        linkPositions[li + 3] = networkPositions[b * 3];
        linkPositions[li + 4] = networkPositions[b * 3 + 1];
        linkPositions[li + 5] = networkPositions[b * 3 + 2];
      }
      linkGeometry.attributes.position.needsUpdate = true;

      for (let i = 0; i < packets.length; i++) {
        const packet = packets[i];
        if (links.length === 0) continue;
        const [a, b] = links[packet.edgeIndex];
        const ax = networkPositions[a * 3];
        const ay = networkPositions[a * 3 + 1];
        const az = networkPositions[a * 3 + 2];
        const bx = networkPositions[b * 3];
        const by = networkPositions[b * 3 + 1];
        const bz = networkPositions[b * 3 + 2];

        packet.progress += packet.speed * 0.01;
        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.edgeIndex = Math.floor(Math.random() * links.length);
        }

        packet.mesh.position.set(
          ax + (bx - ax) * packet.progress,
          ay + (by - ay) * packet.progress,
          az + (bz - az) * packet.progress
        );
      }

      for (let i = 0; i < keyframes.length; i++) {
        const entry = keyframes[i];
        const pulse = 1 + Math.sin(elapsed * 2.6 + entry.phase) * 0.22;
        entry.mesh.scale.x = pulse;
        entry.mesh.scale.y = 1 + Math.sin(elapsed * 2 + entry.phase) * 0.08;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      geometry.dispose();
      points.material.dispose();
      core.geometry.dispose();
      core.material.dispose();
      scanRing.geometry.dispose();
      scanRing.material.dispose();
      timelineRing.geometry.dispose();
      timelineRing.material.dispose();
      keyframeGeometry.dispose();
      keyframeMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      linkGeometry.dispose();
      linkMaterial.dispose();
      packetGeometry.dispose();
      packetMaterial.dispose();
      sweepMesh.geometry.dispose();
      sweepMesh.material.dispose();
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
