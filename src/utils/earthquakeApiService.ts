import { Earthquake } from "@/types/earthquake";
import { fetchEarthquakesUSGS } from "./usgsEarthquakeApi";
import { fetchEarthquakesEMSC } from "./emscEarthquakeApi";
import { fetchEarthquakesGeoNet } from "./geonetEarthquakeApi";

// Cache for earthquake data to reduce API requests on errors
interface SourceCache {
  data: Earthquake[];
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const sourceCache = new Map<string, SourceCache>();

// Helper function to check if two earthquakes are the same event
const isSameEarthquake = (eq1: Earthquake, eq2: Earthquake): boolean => {
  // Time threshold (3 minutes)
  const TIME_THRESHOLD = 3 * 60 * 1000;
  // Distance threshold (50km)
  const DISTANCE_THRESHOLD = 50;
  
  // Check if events are close in time
  const timeDiff = Math.abs(eq1.time - eq2.time);
  if (timeDiff > TIME_THRESHOLD) return false;
  
  // Calculate distance between events
  const [lon1, lat1] = eq1.coordinates;
  const [lon2, lat2] = eq2.coordinates;
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  // Check if events are close in location and have similar magnitude
  return distance < DISTANCE_THRESHOLD && 
         Math.abs(eq1.magnitude - eq2.magnitude) <= 0.5;
}

// Helper function to merge duplicate earthquakes
const mergeEarthquakes = (eq1: Earthquake, eq2: Earthquake): Earthquake => {
  // Prefer the source with more detailed information
  const preferredSource = 
    eq1.source === 'USGS' ? eq1 :
    eq2.source === 'USGS' ? eq2 :
    eq1.source === 'EMSC' ? eq1 :
    eq2.source === 'EMSC' ? eq2 :
    eq1;
    
  return {
    ...preferredSource,
    // Use the highest magnitude reported
    magnitude: Math.max(eq1.magnitude, eq2.magnitude),
    // Combine felt reports if available
    felt: eq1.felt || eq2.felt,
    // Use highest tsunami warning
    tsunami: Math.max(eq1.tsunami, eq2.tsunami),
    // Note multiple sources
    source: `${preferredSource.source} (verified by ${eq1.source === preferredSource.source ? eq2.source : eq1.source})`
  };
};
let cachedEarthquakeData: Earthquake[] = [];
let lastSuccessfulFetch = 0;

// Function to fetch earthquake data from all sources
export const fetchEarthquakes = async (): Promise<Earthquake[]> => {
  try {
    console.log("Fetching earthquake data from multiple global sources...");
    
    // Fetch from multiple sources in parallel for better performance
    const [usgsData, emscData, geonetData] = await Promise.all([
      fetchEarthquakesUSGS().catch(err => {
        console.warn("USGS fetch error:", err);
        return [];
      }),
      fetchEarthquakesEMSC().catch(err => {
        console.warn("EMSC fetch error:", err);
        return [];
      }),
      fetchEarthquakesGeoNet().catch(err => {
        console.warn("GeoNet fetch error:", err);
        return [];
      })
    ]);
    
    console.log(`Fetched ${usgsData.length} USGS, ${emscData.length} EMSC, and ${geonetData.length} GeoNet earthquakes`);
    
    // Combine all data sources
    const combinedData = [...usgsData, ...emscData, ...geonetData];
    
    if (combinedData.length > 0) {
      // Filter out invalid entries first
      const validData = combinedData.filter(eq => eq.magnitude > 0);
      
      // Advanced deduplication using location and time proximity
      const deduplicatedData: Earthquake[] = [];
      const processedIds = new Set<string>();
      
      validData.forEach(earthquake => {
        if (processedIds.has(earthquake.id)) return;
        
        // Find potential duplicates
        const duplicates = validData.filter(eq => 
          eq.id !== earthquake.id && 
          !processedIds.has(eq.id) && 
          isSameEarthquake(earthquake, eq)
        );
        
        // If duplicates found, merge them
        let finalEarthquake = earthquake;
        duplicates.forEach(duplicate => {
          processedIds.add(duplicate.id);
          finalEarthquake = mergeEarthquakes(finalEarthquake, duplicate);
        });
        
        processedIds.add(earthquake.id);
        deduplicatedData.push(finalEarthquake);
      });
      
      // Sort by most recent
      const processedData = deduplicatedData.sort((a, b) => b.time - a.time);
      
      // Update cache and timestamp on successful fetch
      cachedEarthquakeData = processedData;
      lastSuccessfulFetch = Date.now();
      
      console.log(`Returning ${processedData.length} processed earthquakes`);
      return processedData;
    }
    
    // If no data is returned but we have a cache less than 15 minutes old, use it
    if (cachedEarthquakeData.length > 0 && Date.now() - lastSuccessfulFetch < 900000) {
      console.log("Using cached earthquake data (less than 15 minutes old)");
      return cachedEarthquakeData;
    }
    
    // Return empty array if all sources fail
    console.warn("Failed to fetch earthquake data from all sources.");
    return [];
    
  } catch (error) {
    console.error("Error fetching earthquake data:", error);
    
    // Use cache if available and less than 15 minutes old
    if (cachedEarthquakeData.length > 0 && Date.now() - lastSuccessfulFetch < 900000) {
      console.log("Using cached earthquake data due to error");
      return cachedEarthquakeData;
    }
    
    // Return empty array in case of error
    console.warn("No data available due to fetch errors");
    return [];
  }
};
