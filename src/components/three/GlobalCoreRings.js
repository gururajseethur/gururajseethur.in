import * as THREE from 'three';

export function createGlobalCoreRings(style, isMobile) {
  const group = new THREE.Group();

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

  return {
    mesh: group,
    update: () => {
      core.rotation.x += 0.002;
      core.rotation.y -= 0.0018;
      scanRing.rotation.z += 0.0036;
      timelineRing.rotation.z -= 0.0022;
    },
    dispose: () => {
      core.geometry.dispose();
      core.material.dispose();
      scanRing.geometry.dispose();
      scanRing.material.dispose();
      timelineRing.geometry.dispose();
      timelineRing.material.dispose();
    },
  };
}
