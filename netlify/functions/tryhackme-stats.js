const THM_USERNAME = 'Gururajseethur';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export const handler = async () => {
  try {
    const response = await fetch(
      `https://tryhackme.com/api/v2/public-profile?username=${THM_USERNAME}&t=${Date.now()}`
    );

    if (!response.ok) {
      return {
        statusCode: 502,
        headers: {
          'Content-Type': 'application/json',
          ...CORS_HEADERS,
        },
        body: JSON.stringify({ error: 'TryHackMe upstream failed' }),
      };
    }

    const payload = await response.json();
    const roomCount = Number(payload?.data?.completedRoomsNumber);

    if (!Number.isFinite(roomCount) || roomCount <= 0) {
      return {
        statusCode: 502,
        headers: {
          'Content-Type': 'application/json',
          ...CORS_HEADERS,
        },
        body: JSON.stringify({ error: 'Invalid room count from TryHackMe' }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        ...CORS_HEADERS,
      },
      body: JSON.stringify({
        roomCount,
        source: 'netlify-function',
        fetchedAt: new Date().toISOString(),
      }),
    };
  } catch {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS,
      },
      body: JSON.stringify({ error: 'Unable to fetch TryHackMe stats' }),
    };
  }
};
