import { Earthquake } from "@/types/earthquake";

interface EMSCFeature {
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number, number];
  };
  properties: {
    mag: number;
    time: string;
    flynn_region?: string;
    place?: string;
  };
}

interface EMSCResponse {
  type: string;
  features: EMSCFeature[];
}

// EMSC (European-Mediterranean Seismological Centre) API
// Updated to get last 24 hours of data with magnitude >= 2.0
export const EMSC_API_URL = 'https://www.seismicportal.eu/fdsnws/event/1/query?limit=1000&start=NOW-24HOURS&minmag=2.0&format=json';

// Function to fetch earthquake data from EMSC
export const fetchEarthquakesEMSC = async (): Promise<Earthquake[]> => {
  try {
    const response = await fetch(EMSC_API_URL, {
      headers: {
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(15000) // 15 seconds timeout
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch EMSC earthquake data: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    
    if (!data || !data.features || !Array.isArray(data.features)) {
      console.warn("Invalid data structure from EMSC API");
      return [];
    }
    
    console.log("EMSC data received:", data.features.length, "entries");
    
    // Transform the data to our format
    return data.features.map((feature: EMSCFeature) => ({
      id: `emsc-${feature.id || Date.now() + Math.random().toString(36).substring(2, 9)}`,
      magnitude: Number(feature.properties?.mag) || 0,
      place: feature.properties?.flynn_region || feature.properties?.place || 'Unknown Location',
      time: feature.properties?.time ? new Date(feature.properties.time).getTime() : Date.now(),
      url: `https://www.emsc-csem.org/Earthquake/earthquake.php?id=${feature.id}`,
      coordinates: [
        Number(feature.geometry?.coordinates?.[0]) || 0,
        Number(feature.geometry?.coordinates?.[1]) || 0,
        Number(feature.geometry?.coordinates?.[2]) || 0
      ],
      felt: null,
      tsunami: 0,
      source: 'EMSC'
    }));
    
  } catch (error) {
    console.warn("Error fetching EMSC earthquake data:", error);
    return [];
  }
};
