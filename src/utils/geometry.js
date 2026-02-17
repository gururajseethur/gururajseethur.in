/**
 * Generate brain-like point cloud distribution.
 * Uses layered ellipsoid with cortex folds.
 */
export function generateBrainPositions(count) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Sphere rejection sampling + ellipsoid distortion
    let x, y, z;
    do {
      x = (Math.random() - 0.5) * 2;
      y = (Math.random() - 0.5) * 2;
      z = (Math.random() - 0.5) * 2;
    } while (x * x + y * y + z * z > 1);

    // Ellipsoid scaling for brain shape
    x *= 2.2;
    y *= 1.6;
    z *= 1.8;

    // Cortex fold displacement
    const theta = Math.atan2(z, x);
    const fold = Math.sin(theta * 6) * 0.15 + Math.sin(theta * 3 + 1.5) * 0.1;
    const r = Math.sqrt(x * x + y * y + z * z);
    const surface = r > 1.2;
    if (surface) {
      x += Math.cos(theta) * fold;
      z += Math.sin(theta) * fold;
    }

    // Central fissure
    if (Math.abs(x) < 0.08 && y > 0) {
      y -= 0.2;
    }

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
  }

  return positions;
}

/**
 * Generate globe (sphere) point cloud via fibonacci spiral.
 * Uniform distribution on sphere surface + some volume fill.
 */
export function generateGlobePositions(count) {
  const positions = new Float32Array(count * 3);
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const radius = 2.0;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // 70% surface, 30% volume for depth
    const isSurface = i < count * 0.7;
    const r = isSurface ? radius : radius * Math.cbrt(Math.random());

    const theta = 2 * Math.PI * i / goldenRatio;
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);

    positions[i3] = r * Math.cos(theta) * Math.sin(phi);
    positions[i3 + 1] = r * Math.cos(phi);
    positions[i3 + 2] = r * Math.sin(theta) * Math.sin(phi);
  }

  return positions;
}

/**
 * Generate random seeds for per-particle variation.
 */
export function generateRandomAttribute(count) {
  const randoms = new Float32Array(count);
  // Deterministic seed using golden ratio distribution
  for (let i = 0; i < count; i++) {
    randoms[i] = ((i * 0.618033988749895) % 1);
  }
  return randoms;
}
