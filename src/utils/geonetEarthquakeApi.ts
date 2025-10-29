import { Earthquake } from "@/types/earthquake";

interface GeoNetProperties {
  publicID: string;
  magnitude: number;
  locality: string;
  time: string;
}

interface GeoNetFeature {
  properties: GeoNetProperties;
  geometry: {
    coordinates: [number, number, number];
  };
}

interface GeoNetResponse {
  features: GeoNetFeature[];
}

// GeoNet New Zealand API - Free, public, and CORS-enabled
const GEONET_API_URL = 'https://api.geonet.org.nz/quake?MMI=0';

export const fetchEarthquakesGeoNet = async (): Promise<Earthquake[]> => {
  try {
    const response = await fetch(GEONET_API_URL, {
      headers: {
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(15000) // 15 seconds timeout
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch GeoNet earthquake data: ${response.status}`);
      return [];
    }
    
    const data = await response.json() as GeoNetResponse;
    
    if (!data || !data.features || !Array.isArray(data.features)) {
      console.warn("Invalid data structure from GeoNet API");
      return [];
    }
    
    console.log("GeoNet data received:", data.features.length, "entries");
    
    return data.features.map((feature: GeoNetFeature) => ({
      id: `geonet-${feature.properties.publicID || Date.now()}`,
      magnitude: Number(feature.properties.magnitude) || 0,
      place: `${feature.properties.locality || 'Unknown'}, New Zealand`,
      time: new Date(feature.properties.time).getTime(),
      url: `https://www.geonet.org.nz/earthquake/${feature.properties.publicID}`,
      coordinates: [
        Number(feature.geometry.coordinates[0]) || 0,
        Number(feature.geometry.coordinates[1]) || 0,
        Number(feature.geometry.coordinates[2]) || 0
      ],
      felt: null,
      tsunami: 0,
      source: 'GeoNet'
    }));
    
  } catch (error) {
    console.warn("Error fetching GeoNet earthquake data:", error);
    return [];
  }
};