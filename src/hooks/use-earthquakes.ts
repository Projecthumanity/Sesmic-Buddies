
import { useState, useEffect, useCallback } from 'react';
import { Earthquake } from '@/types/earthquake';
import { subscribeToEarthquakes } from '@/utils/earthquakeApi';
import { calculateDistance } from '@/utils/formatters';
import { toast } from 'sonner';

export interface UseEarthquakesOptions {
  thresholdMagnitude: number;
  userLocation: [number, number] | null;
  thresholdDistance: number;
}

export const useEarthquakes = ({ thresholdMagnitude, userLocation, thresholdDistance }: UseEarthquakesOptions) => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [filteredEarthquakes, setFilteredEarthquakes] = useState<Earthquake[]>([]);
  const [allEarthquakeHistory, setAllEarthquakeHistory] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Determine if an earthquake is nearby based on user location and threshold distance
  const isEarthquakeNearby = useCallback((earthquake: Earthquake): boolean => {
    if (!userLocation) return false;
    
    const [userLong, userLat] = userLocation;
    const [eqLong, eqLat] = [earthquake.coordinates[0], earthquake.coordinates[1]];
    
    const distance = calculateDistance(userLat, userLong, eqLat, eqLong);
    const isNearby = distance <= thresholdDistance;

    if (isNearby && earthquake.magnitude >= thresholdMagnitude) {
      toast.warning(`Nearby Earthquake Detected!`, {
        description: `Magnitude ${earthquake.magnitude.toFixed(1)} earthquake ${Math.round(distance)}km away`,
        duration: 10000,
      });
    }

    return isNearby;
  }, [userLocation, thresholdDistance, thresholdMagnitude]);

  // Filter earthquakes based on threshold
  useEffect(() => {
    const filtered = earthquakes
      .filter((eq) => eq.magnitude >= thresholdMagnitude)
      .sort((a, b) => b.time - a.time)
      .slice(0, 100); // Show more earthquakes on the map
    
    setFilteredEarthquakes(filtered);
  }, [earthquakes, thresholdMagnitude]);

  // Handle new earthquake data
  const handleNewEarthquakes = useCallback((data: Earthquake[]) => {
    setLoading(false);
    
    // Keep track of all earthquakes for history
    setAllEarthquakeHistory(prevHistory => {
      const combinedHistory = [...prevHistory];
      
      data.forEach(eq => {
        if (!combinedHistory.some(existing => existing.id === eq.id)) {
          combinedHistory.push(eq);
          // Check if new earthquake is nearby only after initial load (avoid noisy toasts on first fetch)
          if (userLocation && earthquakes.length > 0) {
            isEarthquakeNearby(eq);
          }
        }
      });
      
      return combinedHistory;
    });
    
    // Update the state with all earthquakes
    setEarthquakes(data);
    
    // Return new earthquakes for alert processing
    return data.filter(
      (eq) => !earthquakes.some((existing) => existing.id === eq.id)
    );
  }, [earthquakes, userLocation, isEarthquakeNearby]);

  return {
    earthquakes,
    filteredEarthquakes,
    allEarthquakeHistory,
    loading,
    isEarthquakeNearby,
    handleNewEarthquakes
  };
};
