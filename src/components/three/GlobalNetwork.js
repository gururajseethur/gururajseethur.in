import * as THREE from 'three';

export function createGlobalNetwork(nodeCount, packetCount, linkDistance, style, isMobile) {
  const group = new THREE.Group();

  const networkPositions = new Float32Array(nodeCount * 3);
  const networkSeeds = new Float32Array(nodeCount);

  for (let i = 0; i < nodeCount; i++) {
    const theta = (i / nodeCount) * Math.PI * 2;
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
  group.add(nodePoints);

  const links = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const dx = networkPositions[i * 3] - networkPositions[j * 3];
      const dy = networkPositions[i * 3 + 1] - networkPositions[j * 3 + 1];
      const dz = networkPositions[i * 3 + 2] - networkPositions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < linkDistance) links.push([i, j]);
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
  group.add(linkSegments);

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
    group.add(mesh);
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
  group.add(sweepMesh);

  group.rotation.x = Math.PI * 0.5;

  return {
    mesh: group,
    update: (elapsed, currentStyle) => {
      group.rotation.z -= 0.0018;
      sweepMesh.rotation.z += 0.014;
      sweepMesh.material.opacity = 0.08 + (Math.sin(elapsed * 2.4) + 1) * 0.035;

      for (let i = 0; i < nodeCount; i++) {
        const idx = i * 3;
        const w = elapsed * (currentStyle.speed * 0.8) + networkSeeds[i];
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
    },
    dispose: () => {
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      linkGeometry.dispose();
      linkMaterial.dispose();
      packetGeometry.dispose();
      packetMaterial.dispose();
      sweepMesh.geometry.dispose();
      sweepMesh.material.dispose();
    },
  };
}
