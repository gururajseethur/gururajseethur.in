import { renderHook, waitFor } from '@testing-library/react';
import useTryHackMeStats from '../useTryHackMeStats';
import { vi } from 'vitest';

describe('useTryHackMeStats', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches successfully from Netlify function', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ roomCount: 85, source: 'netlify-function', fetchedAt: new Date().toISOString() })
    });

    const { result } = renderHook(() => useTryHackMeStats());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(false);
    expect(result.current.roomCount).toBe(85);
    expect(result.current.source).toBe('netlify-function');
    expect(window.localStorage.getItem('thm_completed_rooms')).toBe('85');
  });

  it('falls back to direct API if Netlify function fails', async () => {
    vi.mocked(fetch)
      .mockRejectedValueOnce(new Error('Netlify failed'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { completedRoomsNumber: 90 } })
      });

    const { result } = renderHook(() => useTryHackMeStats());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(false);
    expect(result.current.roomCount).toBe(90);
    expect(result.current.source).toBe('direct-api');
    expect(window.localStorage.getItem('thm_completed_rooms')).toBe('90');
  });

  it('falls back to cache and sets error state when both netlify and direct fetch fail', async () => {
    window.localStorage.setItem('thm_completed_rooms', '80');

    // Mock sequential fetch failures
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Netlify failed'))
                    .mockRejectedValueOnce(new Error('Direct API failed'));

    const { result } = renderHook(() => useTryHackMeStats());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
    expect(result.current.source).toBe('cache');
    // It should keep the cached room count
    expect(result.current.roomCount).toBe(80);
  });

  it('uses baseline count when cache is empty and fetches fail', async () => {
    // Mock sequential fetch failures
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Netlify failed'))
                    .mockRejectedValueOnce(new Error('Direct API failed'));

    const { result } = renderHook(() => useTryHackMeStats());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(true);
    expect(result.current.source).toBe('cache');
    // It should keep the baseline room count
    expect(result.current.roomCount).toBe(70);
  });
});
