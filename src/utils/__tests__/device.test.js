import { describe, it, expect } from 'vitest';
import { getParticleCount } from '../device';

describe('getParticleCount', () => {
  it('should return 8000 when isMobile is true', () => {
    expect(getParticleCount(true)).toBe(8000);
  });

  it('should return 50000 when isMobile is false', () => {
    expect(getParticleCount(false)).toBe(50000);
  });
});
