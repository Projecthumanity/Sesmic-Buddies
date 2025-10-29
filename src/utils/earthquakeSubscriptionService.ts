
import { Earthquake } from "@/types/earthquake";
import { fetchEarthquakes } from "./earthquakeApiService";

// Constants - reasonable refresh interval
export const REFRESH_INTERVAL = 30000; // 30 seconds - reduces API/processing load

// Set up a subscription to earthquake data
export const subscribeToEarthquakes = (
  callback: (earthquakes: Earthquake[]) => void
): { unsubscribe: () => void } => {
  let isActive = true;
  let isFirstFetch = true;
  let lastFetchTimestamp = 0;
  let lastProcessedData: Record<string, boolean> = {};
  let consecutiveErrors = 0;
  let isFetching = false; // prevent overlapping fetches
  
  const fetchAndUpdate = async () => {
    if (!isActive) return;
    
    try {
      // Prevent overlapping fetches
      if (isFetching) {
        // schedule a retry later
        setTimeout(fetchAndUpdate, REFRESH_INTERVAL);
        return;
      }
      isFetching = true;

      // Avoid making too many requests if the previous one completed recently
      const now = Date.now();
      if (now - lastFetchTimestamp < 5000) {
        setTimeout(fetchAndUpdate, REFRESH_INTERVAL);
        isFetching = false;
        return;
      }

      lastFetchTimestamp = now;
      const earthquakes = await fetchEarthquakes();

      if (isActive) {
        if (isFirstFetch) {
          // On first fetch, send a limited batch to initialize the UI (avoid overwhelming the client)
          const initialBatch = earthquakes.slice(0, 200);
          callback(initialBatch);

          // Store the IDs of existing earthquakes (limited)
          lastProcessedData = initialBatch.reduce((acc, eq) => {
            acc[eq.id] = true;
            return acc;
          }, {} as Record<string, boolean>);

          isFirstFetch = false;
          consecutiveErrors = 0;
        } else {
          // Filter out earthquakes that we've already processed
          const newEarthquakes = earthquakes.filter(eq => !lastProcessedData[eq.id]);

          // Update the processed data store (keep as a rolling set)
          const MAX_TRACKED = 2000;
          earthquakes.forEach(eq => {
            lastProcessedData[eq.id] = true;
          });

          // Cap how many new events we emit per cycle to avoid UI floods
          const MAX_EMIT_PER_CYCLE = 100;
          const emitBatch = newEarthquakes.slice(0, MAX_EMIT_PER_CYCLE);

          if (emitBatch.length > 0) {
            console.log(`Detected ${emitBatch.length} new earthquakes`);
            callback(emitBatch);
          }

          // Keep lastProcessedData map size bounded
          const keys = Object.keys(lastProcessedData);
          if (keys.length > MAX_TRACKED) {
            const toRemove = keys.length - MAX_TRACKED;
            for (let i = 0; i < toRemove; i++) {
              delete lastProcessedData[keys[i]];
            }
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
      // Increase interval if we're having errors (simple backoff)
      const base = REFRESH_INTERVAL;
      const backoff = Math.min(8, Math.pow(2, Math.max(0, consecutiveErrors - 1)));
      const interval = consecutiveErrors > 0 ? base * backoff : base;
      setTimeout(fetchAndUpdate, interval);
    }

    // allow next fetch to proceed
    isFetching = false;
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


