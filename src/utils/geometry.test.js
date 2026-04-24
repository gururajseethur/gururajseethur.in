import { describe, it, expect } from 'vitest';
import { generateBrainPositions } from './geometry.js';

describe('generateBrainPositions', () => {
  it('should return a Float32Array', () => {
    const result = generateBrainPositions(10);
    expect(result).toBeInstanceOf(Float32Array);
  });

  it('should return an array of length count * 3', () => {
    const count = 100;
    const result = generateBrainPositions(count);
    expect(result.length).toBe(count * 3);
  });

  it('should handle count = 0', () => {
    const result = generateBrainPositions(0);
    expect(result).toBeInstanceOf(Float32Array);
    expect(result.length).toBe(0);
  });

  it('should generate positions within expected bounds', () => {
    const count = 1000;
    const result = generateBrainPositions(count);

    // Bounds are roughly based on scaling factors: x: 2.2, y: 1.6, z: 1.8
    // plus cortex fold displacements of ~0.25 max
    // Check that positions don't wildly exceed expected scales
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    let minX = Infinity, minY = Infinity, minZ = Infinity;

    for (let i = 0; i < result.length; i += 3) {
      const x = result[i];
      const y = result[i+1];
      const z = result[i+2];

      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      if (z > maxZ) maxZ = z;

      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (z < minZ) minZ = z;
    }

    // Checking boundaries.
    // original x * 2.2, plus up to ~0.25. max ~ 2.45
    // original y * 1.6, minus 0.2 occasionally. max ~ 1.6
    // original z * 1.8, plus up to ~0.25. max ~ 2.05
    expect(maxX).toBeLessThan(3.0);
    expect(minX).toBeGreaterThan(-3.0);

    expect(maxY).toBeLessThan(2.0);
    expect(minY).toBeGreaterThan(-2.0);

    expect(maxZ).toBeLessThan(2.5);
    expect(minZ).toBeGreaterThan(-2.5);
  });
});
