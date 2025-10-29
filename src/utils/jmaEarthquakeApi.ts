import { Earthquake } from "@/types/earthquake";

// JMA (Japan Meteorological Agency) Public Feed - CORS-enabled, no API key needed
const JMA_API_URL = 'https://www.jma.go.jp/bosai/quake/data/list.json';

export const fetchEarthquakesJMA = async (): Promise<Earthquake[]> => {
  try {
    const response = await fetch(JMA_API_URL, {
      headers: {
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(15000) // 15 seconds timeout
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch JMA earthquake data: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.warn("Invalid data structure from JMA API");
      return [];
    }
    
    console.log("JMA data received:", data.length, "entries");
    
    // JMA data is in a different format, we need to transform it
    return data.map((event) => ({
      id: `jma-${event.eventID || Date.now()}`,
      magnitude: Number(event.magnitude) || 0,
      place: `${event.regionName || 'Unknown'}, Japan`,
      time: event.originTime ? new Date(event.originTime).getTime() : Date.now(),
      url: 'https://www.jma.go.jp/en/quake/',
      coordinates: [
        Number(event.longitude) || 0,
        Number(event.latitude) || 0,
        Number(event.depth) || 0
      ],
      felt: null,
      tsunami: event.tsunami === "警報" ? 1 : 0, // "警報" means warning
      source: 'JMA'
    }));
    
  } catch (error) {
    console.warn("Error fetching JMA earthquake data:", error);
    return [];
  }
};