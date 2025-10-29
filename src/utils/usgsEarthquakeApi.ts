
import { Earthquake } from "@/types/earthquake";

// USGS API URL - Direct access (USGS supports CORS)
export const USGS_API_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

// Function to fetch earthquake data from USGS
export const fetchEarthquakesUSGS = async (): Promise<Earthquake[]> => {
  try {
    // USGS API supports CORS, so we can access it directly
    const response = await fetch(USGS_API_URL, {
      headers: {
        'Accept': 'application/json'
      },
      // Add timeout to prevent long-hanging requests
      signal: AbortSignal.timeout(15000) // 15 seconds timeout
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch USGS earthquake data: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    
    if (!data || !data.features || !Array.isArray(data.features)) {
      console.warn("Invalid data structure from USGS API");
      return [];
    }
    
    console.log("USGS data received:", data.features.length, "entries");
    
    // Transform the data to our format with better error handling
    return data.features.map((feature: any) => ({
      id: feature.id || `usgs-${Date.now()}`,
      magnitude: Number(feature.properties.mag) || 0,
      place: feature.properties.place || 'Unknown Location',
      time: feature.properties.time || Date.now(),
      url: feature.properties.url || 'https://earthquake.usgs.gov',
      coordinates: [
        Number(feature.geometry.coordinates[0]) || 0,
        Number(feature.geometry.coordinates[1]) || 0,
        Number(feature.geometry.coordinates[2]) || 0
      ],
      felt: feature.properties.felt || null,
      tsunami: Number(feature.properties.tsunami) || 0,
      source: 'USGS'
    }));
    
  } catch (error) {
    console.warn("Error fetching USGS earthquake data:", error);
    return [];
  }
};
