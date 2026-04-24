import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useTryHackMeStats from './useTryHackMeStats';

// Mock the global fetch
const originalFetch = global.fetch;

describe('useTryHackMeStats', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    // Clear localStorage
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully fetch from Netlify function', async () => {
    const mockNetlifyResponse = {
      roomCount: 85,
      source: 'netlify-function',
      fetchedAt: '2023-10-27T10:00:00.000Z'
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockNetlifyResponse,
    });

    const { result } = renderHook(() => useTryHackMeStats());

    // Initially loading
    expect(result.current.loading).toBe(true);

    // Wait for the hook to finish loading
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.roomCount).toBe(85);
    expect(result.current.source).toBe('netlify-function');
    expect(result.current.error).toBe(false);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).toContain('/.netlify/functions/tryhackme-stats');
  });

  it('should fallback to direct API if Netlify function fails', async () => {
    const mockDirectResponse = {
      data: {
        completedRoomsNumber: 90
      }
    };

    // First call (Netlify) fails, second call (direct) succeeds
    global.fetch
      .mockRejectedValueOnce(new Error('Netlify function unavailable'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockDirectResponse,
      });

    const { result } = renderHook(() => useTryHackMeStats());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.roomCount).toBe(90);
    expect(result.current.source).toBe('direct-api');
    expect(result.current.error).toBe(false);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch.mock.calls[0][0]).toContain('/.netlify/functions/tryhackme-stats');
    expect(global.fetch.mock.calls[1][0]).toContain('https://tryhackme.com/api/v2/public-profile');
  });

  it('should handle failure of both Netlify and direct API fetches', async () => {
    // Both calls fail
    global.fetch
      .mockRejectedValueOnce(new Error('Netlify function unavailable'))
      .mockRejectedValueOnce(new Error('Direct API unavailable'));

    const { result } = renderHook(() => useTryHackMeStats());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
    expect(result.current.source).toBe('cache');
    // Should fallback to BASELINE_ROOMS (70) or cached value
    expect(result.current.roomCount).toBe(70);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('should fallback to direct API if Netlify function returns non-ok response', async () => {
    const mockDirectResponse = {
      data: {
        completedRoomsNumber: 95
      }
    };

    // First call (Netlify) returns 500, second call (direct) succeeds
    global.fetch
      .mockResolvedValueOnce({
        ok: false,
        status: 500
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockDirectResponse,
      });

    const { result } = renderHook(() => useTryHackMeStats());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.roomCount).toBe(95);
    expect(result.current.source).toBe('direct-api');
    expect(result.current.error).toBe(false);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
