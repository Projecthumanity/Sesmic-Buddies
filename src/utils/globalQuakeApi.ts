
import { Earthquake } from "@/types/earthquake";

// GlobalQuake API URL - Try direct access first, then fallback to CORS proxy
export const GLOBALQUAKE_API_URL = 'https://globalquake.spf.io/api/earthquakes/events';
export const GLOBALQUAKE_CORS_PROXY_URL = 'https://corsproxy.io/?https://globalquake.spf.io/api/earthquakes/events';

// Function to fetch earthquake data from GlobalQuake
export const fetchEarthquakesGlobalQuake = async (): Promise<Earthquake[]> => {
  try {
    // Try direct access first
    let response = await fetch(GLOBALQUAKE_API_URL, {
      headers: {
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(10000) // 10 seconds timeout
    }).catch(() => null);
    
    // If direct access fails, try CORS proxy
    if (!response || !response.ok) {
      console.log("Trying GlobalQuake with CORS proxy...");
      response = await fetch(GLOBALQUAKE_CORS_PROXY_URL, {
        headers: {
          'Accept': 'application/json'
        },
        signal: AbortSignal.timeout(10000)
      });
    }
    
    if (!response || !response.ok) {
      console.warn(`GlobalQuake API failed with status: ${response?.status}`);
      return [];
    }
    
    if (!response.ok) {
      console.warn(`GlobalQuake API returned status: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.warn("Invalid data structure from GlobalQuake API");
      return [];
    }
    
    console.log("GlobalQuake data received:", data.length, "entries");
    
    // Transform the GlobalQuake data to our format with better error handling
    return data.map((quake: any) => ({
      id: `gq-${quake.id || quake.eventId || Date.now() + Math.random().toString(36).substring(2, 9)}`,
      magnitude: Number(quake.magnitude) || 0,
      place: quake.region || 'Unknown Location',
      time: quake.time ? new Date(quake.time).getTime() : Date.now(),
      url: 'https://globalquake.spf.io',
      coordinates: [
        Number(quake.longitude) || 0, 
        Number(quake.latitude) || 0, 
        Number(quake.depth) || 10
      ],
      felt: null,
      tsunami: 0,
      source: 'GlobalQuake'
    }));
    
  } catch (error) {
    console.warn("Error fetching GlobalQuake data:", error);
    return [];
  }
};
