
import { Earthquake } from "@/types/earthquake";
import { fetchEarthquakes } from "./earthquakeApiService";

// Constants - reasonable refresh interval
export const REFRESH_INTERVAL = 10000; // 10 seconds for more reasonable updates

// Set up a subscription to earthquake data
export const subscribeToEarthquakes = (
  callback: (earthquakes: Earthquake[]) => void
): { unsubscribe: () => void } => {
  let isActive = true;
  let isFirstFetch = true;
  let lastFetchTimestamp = 0;
  let lastProcessedData: Record<string, boolean> = {};
  let consecutiveErrors = 0;
  
  const fetchAndUpdate = async () => {
    if (!isActive) return;
    
    try {
      // Avoid making too many requests if the previous one is still in progress
      const now = Date.now();
      if (now - lastFetchTimestamp < 5000) {
        setTimeout(fetchAndUpdate, REFRESH_INTERVAL);
        return;
      }
      
      lastFetchTimestamp = now;
      const earthquakes = await fetchEarthquakes();
      
      if (isActive) {
        if (isFirstFetch) {
          // On first fetch, send all data to initialize the UI
          callback(earthquakes);
          
          // Store the IDs of existing earthquakes
          lastProcessedData = earthquakes.reduce((acc, eq) => {
            acc[eq.id] = true;
            return acc;
          }, {} as Record<string, boolean>);
          
          isFirstFetch = false;
          consecutiveErrors = 0;
        } else {
          // Filter out earthquakes that we've already processed
          const newEarthquakes = earthquakes.filter(eq => !lastProcessedData[eq.id]);
          
          // Update the processed data store
          earthquakes.forEach(eq => {
            lastProcessedData[eq.id] = true;
          });
          
          // Only send new earthquakes to the callback
          if (newEarthquakes.length > 0) {
            console.log(`Detected ${newEarthquakes.length} new earthquakes`);
            callback(newEarthquakes);
          }
          
          consecutiveErrors = 0;
        }
      }
    } catch (error) {
      console.error("Error in earthquake subscription:", error);
      consecutiveErrors++;
      
      // If we've had too many consecutive errors, notify but continue trying
      if (consecutiveErrors > 3) {
        console.warn("Too many consecutive errors, will keep retrying");
        if (isFirstFetch) {
          callback([]);
          isFirstFetch = false;
        }
      }
    }
    
    if (isActive) {
      // Increase interval if we're having errors
      const interval = consecutiveErrors > 0 ? REFRESH_INTERVAL * 2 : REFRESH_INTERVAL;
      setTimeout(fetchAndUpdate, interval);
    }
  };
  
  // Start the subscription
  fetchAndUpdate();
  
  // Return a function to unsubscribe
  return {
    unsubscribe: () => {
      isActive = false;
    }
  };
};


