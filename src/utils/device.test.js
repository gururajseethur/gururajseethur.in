// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getDevicePixelRatio } from './device';

describe('getDevicePixelRatio', () => {
  let originalDevicePixelRatio;

  beforeEach(() => {
    originalDevicePixelRatio = window.devicePixelRatio;
  });

  afterEach(() => {
    Object.defineProperty(window, 'devicePixelRatio', {
      value: originalDevicePixelRatio,
      configurable: true,
    });
  });

  const setDPR = (value) => {
    Object.defineProperty(window, 'devicePixelRatio', {
      value,
      configurable: true,
    });
  };

  it('returns 1 if override is true, regardless of mobile or DPR', () => {
    setDPR(3);
    expect(getDevicePixelRatio(false, true)).toBe(1);
    expect(getDevicePixelRatio(true, true)).toBe(1);
  });

  it('returns 1 if isMobile is true, regardless of actual DPR', () => {
    setDPR(3);
    expect(getDevicePixelRatio(true, false)).toBe(1);
  });

  it('returns actual DPR when not mobile and DPR <= 2', () => {
    setDPR(1);
    expect(getDevicePixelRatio(false, false)).toBe(1);

    setDPR(1.5);
    expect(getDevicePixelRatio(false, false)).toBe(1.5);

    setDPR(2);
    expect(getDevicePixelRatio(false, false)).toBe(2);
  });

  it('clamps DPR to 2 when not mobile and actual DPR > 2', () => {
    setDPR(2.5);
    expect(getDevicePixelRatio(false, false)).toBe(2);

    setDPR(3);
    expect(getDevicePixelRatio(false, false)).toBe(2);
  });

  it('handles missing devicePixelRatio gracefully', () => {
    setDPR(undefined);
    expect(getDevicePixelRatio(false, false)).toBeNaN();
  });
});
