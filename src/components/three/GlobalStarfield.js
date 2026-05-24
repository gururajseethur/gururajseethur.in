import * as THREE from 'three';

export function createGlobalStarfield(pointCount, style, isMobile) {
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

  return {
    mesh: points,
    update: (elapsed, currentStyle) => {
      for (let i = 0; i < pointCount; i++) {
        const idx = i * 3;
        const w = elapsed * currentStyle.speed + seeds[i];
        const drift = Math.sin(w) * currentStyle.noise;
        positions[idx] += Math.cos(w * 0.37) * 0.002 + drift * 0.0007;
        positions[idx + 1] += Math.sin(w * 0.31) * 0.002;
        positions[idx + 2] += Math.cos(w * 0.23) * 0.0014;
      }
      geometry.attributes.position.needsUpdate = true;
    },
    dispose: () => {
      geometry.dispose();
      points.material.dispose();
    },
  };
}
