import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const baseUrl = 'https://www.seismicportal.eu/fdsnws/event/1/query';
    const params = new URLSearchParams({
      limit: '1000',
      start: 'NOW-24HOURS',
      minmag: '2.0',
      format: 'json'
    });

    const res = await fetch(`${baseUrl}?${params}`);
    const data = await res.json();

    // Set CORS headers
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
      response.status(200).end();
      return;
    }

    response.status(200).json(data);
  } catch (error) {
    console.error('Error fetching EMSC data:', error);
    response.status(500).json({ error: 'Failed to fetch EMSC data' });
  }
}