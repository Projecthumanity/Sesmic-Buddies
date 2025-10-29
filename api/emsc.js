export default async function handler(req, res) {
  try {
    const baseUrl = 'https://www.seismicportal.eu/fdsnws/event/1/query';
    const params = new URLSearchParams({
      limit: '1000',
      start: 'NOW-24HOURS',
      minmag: '2.0',
      format: 'json'
    });

    const resp = await fetch(`${baseUrl}?${params}`);
    const text = await resp.text();

    // Allow cross-origin requests from the frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (!resp.ok) {
      // forward status and a snippet of body for debugging
      const snippet = text ? text.toString().slice(0, 1024) : '';
      res.status(resp.status).json({ error: `Upstream returned ${resp.status}`, bodySnippet: snippet });
      return;
    }

    // Attempt to parse JSON and return it
    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch (err) {
      // If not JSON, return the raw text with 502
      res.status(502).json({ error: 'Invalid JSON from upstream', bodySnippet: text.slice(0, 1024) });
    }
  } catch (error) {
    console.error('Error fetching EMSC data:', error);
    res.status(500).json({ error: 'Failed to fetch EMSC data' });
  }
}
