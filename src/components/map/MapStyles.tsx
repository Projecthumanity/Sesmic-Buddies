
import React from 'react';

const MapStyles: React.FC = () => {
  return (
    <style>
      {`
      /* Set lower z-index values for map elements */
      .leaflet-container {
        z-index: 1;
      }
      .leaflet-control-container {
        z-index: 2;
      }
      .leaflet-pane {
        z-index: 3;
      }
      .leaflet-overlay-pane {
        z-index: 4;
      }
      .leaflet-popup-pane {
        z-index: 5;
      }

      .earthquake-marker {
        border-radius: 50%;
      }
      
      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.8;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      
      .earthquake-marker div {
        animation: pulse 2s infinite;
      }
      
      .GlobalQuake-marker div {
        animation: pulse 1.5s infinite;
        border-style: dashed;
      }
      `}
    </style>
  );
};

export default MapStyles;
