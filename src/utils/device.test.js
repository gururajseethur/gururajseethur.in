import { describe, it, expect } from 'vitest';
import { getParticleCount } from './device';

describe('getParticleCount', () => {
  it('returns 8000 when isMobile is true', () => {
    expect(getParticleCount(true)).toBe(8000);
  });

  it('returns 50000 when isMobile is false', () => {
    expect(getParticleCount(false)).toBe(50000);
  });

  it('handles other truthy values as true', () => {
    expect(getParticleCount(1)).toBe(8000);
    expect(getParticleCount('yes')).toBe(8000);
  });

  it('handles other falsy values as false', () => {
    expect(getParticleCount(0)).toBe(50000);
    expect(getParticleCount(null)).toBe(50000);
    expect(getParticleCount(undefined)).toBe(50000);
  });
});
