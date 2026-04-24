import * as THREE from 'three';
import { performance } from 'perf_hooks';

function buildGalaxyDiscOriginal(count, color1Hex, color2Hex) {
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
}

function buildGalaxyDiscOptimized(count, color1Hex, color2Hex) {
  const positions = new Float32Array(count * 3);
  const colors    = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const c1 = new THREE.Color(color1Hex);
  const c2 = new THREE.Color(color2Hex);
  const col = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const angle  = i * goldenAngle;
    const radius = Math.sqrt(i / count) * 3.0;
    const spread = (Math.random() - 0.5) * 0.18;
    positions[i * 3]     = Math.cos(angle) * radius + spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
    positions[i * 3 + 2] = Math.sin(angle) * radius + spread;

    const t = radius / 3.0;
    col.copy(c1).lerp(c2, Math.min(t, 1));
    colors[i * 3]     = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }
}

const ITERATIONS = 1000;
const COUNT = 2000;

let startOriginal = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  buildGalaxyDiscOriginal(COUNT, '#FF3B3B', '#FF8080');
}
let endOriginal = performance.now();

let startOptimized = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  buildGalaxyDiscOptimized(COUNT, '#FF3B3B', '#FF8080');
}
let endOptimized = performance.now();

console.log(`Original: ${(endOriginal - startOriginal).toFixed(2)} ms`);
console.log(`Optimized: ${(endOptimized - startOptimized).toFixed(2)} ms`);
