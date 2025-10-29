
import L from 'leaflet';
import { getMagnitudeColor } from './formatters';

// Create a custom icon for earthquake markers based on magnitude
export const createEarthquakeIcon = (magnitude: number, source?: string) => {
  const magnitudeSize = Math.max(12, magnitude * 6);
  
  // Set color based on magnitude threshold (green for <5.0, red for ≥5.0)
  const color = magnitude >= 5.0 ? '#ea384c' : '#4ade80';
  
  // Different border color for different sources
  const borderColor = source === 'GlobalQuake' ? '#6366f1' : 'white';
  
  return L.divIcon({
    className: `earthquake-marker ${source || 'usgs'}-marker`,
    html: `<div style="
      width: ${magnitudeSize}px;
      height: ${magnitudeSize}px;
      background-color: ${color};
      border-radius: 50%;
      border: 2px solid ${borderColor};
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      animation: pulse 2s infinite;
    "></div>`,
    iconSize: [magnitudeSize, magnitudeSize],
    iconAnchor: [magnitudeSize/2, magnitudeSize/2]
  });
};

// Create a custom icon for felt report markers
export const createFeltReportIcon = () => {
  return L.divIcon({
    className: 'felt-marker',
    html: `<div style="
      width: 12px;
      height: 12px;
      background-color: #FF5733;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    "></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
};
