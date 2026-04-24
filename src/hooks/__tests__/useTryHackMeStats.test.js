import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import useTryHackMeStats from '../useTryHackMeStats';

describe('useTryHackMeStats', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    window.localStorage.clear();
    // Setup a default global fetch mock that resolves successfully for netlify
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('/.netlify/functions/tryhackme-stats')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ roomCount: 80, source: 'netlify-function', fetchedAt: new Date().toISOString() })
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { completedRoomsNumber: 85 } })
      });
    });
  });

  it('should fallback to direct API when netlify function fails', async () => {
    // Mock fetch to fail for netlify, but succeed for direct API
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('/.netlify/functions/tryhackme-stats')) {
        return Promise.reject(new Error('Netlify function unavailable'));
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: { completedRoomsNumber: 85 } })
      });
    });

    const { result } = renderHook(() => useTryHackMeStats());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.roomCount).toBe(85);
    expect(result.current.source).toBe('direct-api');
    expect(result.current.error).toBe(false);

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenNthCalledWith(1, '/.netlify/functions/tryhackme-stats', expect.any(Object));
    expect(global.fetch).toHaveBeenNthCalledWith(2, expect.stringContaining('https://tryhackme.com/api/v2/public-profile'), expect.any(Object));
  });

  it('should successfully fetch from netlify first', async () => {
    const { result } = renderHook(() => useTryHackMeStats());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.roomCount).toBe(80);
    expect(result.current.source).toBe('netlify-function');
    expect(result.current.error).toBe(false);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/.netlify/functions/tryhackme-stats', expect.any(Object));
  });

  it('should set error state and use cache when both fail', async () => {
    global.fetch = vi.fn().mockImplementation(() => Promise.reject(new Error('Network error')));

    const { result } = renderHook(() => useTryHackMeStats());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // 70 is BASELINE_ROOMS defined in the hook
    expect(result.current.roomCount).toBe(70);
    expect(result.current.source).toBe('cache');
    expect(result.current.error).toBe(true);
  });
});
