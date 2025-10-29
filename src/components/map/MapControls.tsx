
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { Earthquake } from '../../utils/earthquakeApi';

interface FlyToEarthquakeProps {
  selectedEarthquake: Earthquake | null;
}

// Component to handle flying to the selected earthquake
export const FlyToEarthquake: React.FC<FlyToEarthquakeProps> = ({ selectedEarthquake }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedEarthquake) {
      const [longitude, latitude] = selectedEarthquake.coordinates;
      map.flyTo([latitude, longitude], 8, {
        animate: true,
        duration: 1.5
      });
    }
  }, [map, selectedEarthquake]);
  
  return null;
};

interface FitBoundsToEarthquakesProps {
  earthquakes: Earthquake[];
}

// Component to handle fitting map bounds to show all earthquakes
export const FitBoundsToEarthquakes: React.FC<FitBoundsToEarthquakesProps> = ({ earthquakes }) => {
  const map = useMap();
  
  useEffect(() => {
    if (earthquakes.length > 0) {
      const bounds = L.latLngBounds(
        earthquakes.map(eq => [eq.coordinates[1], eq.coordinates[0]])
      );
      
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 5
      });
    }
  }, [map, earthquakes]);
  
  return null;
};
