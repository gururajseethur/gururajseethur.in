import { useEffect, useState } from 'react';

const THM_USERNAME = 'Gururajseethur';
const THM_CACHE_KEY = 'thm_completed_rooms';
const THM_CACHE_TIME_KEY = 'thm_completed_rooms_fetched_at';
const BASELINE_ROOMS = 70;

async function fetchFromNetlify(signal) {
  const response = await fetch('/.netlify/functions/tryhackme-stats', { signal });
  if (!response.ok) throw new Error('Netlify function unavailable');
  const payload = await response.json();
  const count = Number(payload?.roomCount);
  if (!Number.isFinite(count) || count <= 0) throw new Error('Invalid Netlify room count');
  return {
    count,
    source: payload?.source || 'netlify-function',
    fetchedAt: payload?.fetchedAt || new Date().toISOString(),
  };
}

async function fetchDirect(signal) {
  const response = await fetch(
    `https://tryhackme.com/api/v2/public-profile?username=${THM_USERNAME}&t=${Date.now()}`,
    { signal }
  );
  if (!response.ok) throw new Error('Direct API unavailable');
  const payload = await response.json();
  const count = Number(payload?.data?.completedRoomsNumber);
  if (!Number.isFinite(count) || count <= 0) throw new Error('Invalid direct room count');
  return {
    count,
    source: 'direct-api',
    fetchedAt: new Date().toISOString(),
  };
}

export default function useTryHackMeStats() {
  const [roomCount, setRoomCount] = useState(() => {
    if (typeof window === 'undefined') return BASELINE_ROOMS;
    const cached = window.localStorage.getItem(THM_CACHE_KEY);
    if (cached && Number.isFinite(Number(cached))) return Number(cached);
    return BASELINE_ROOMS;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetchedAt, setFetchedAt] = useState(() => {
    if (typeof window === 'undefined') return null;
    const cached = window.localStorage.getItem(THM_CACHE_TIME_KEY);
    return cached || null;
  });
  const [source, setSource] = useState('cache');

  useEffect(() => {
    const controller = new AbortController();

    async function loadStats() {
      try {
        let result;
        try {
          result = await fetchFromNetlify(controller.signal);
        } catch {
          result = await fetchDirect(controller.signal);
        }

        setRoomCount(result.count);
        setSource(result.source);
        const syncedAt = result.fetchedAt || new Date().toISOString();
        setFetchedAt(syncedAt);
        setError(false);
        window.localStorage.setItem(THM_CACHE_KEY, String(result.count));
        window.localStorage.setItem(THM_CACHE_TIME_KEY, syncedAt);
      } catch {
        setError(true);
        setSource('cache');
      } finally {
        setLoading(false);
      }
    }

    loadStats();
    return () => controller.abort();
  }, []);

  return { roomCount, loading, error, fetchedAt, source };
}
