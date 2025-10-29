
import React from 'react';
import { Earthquake } from '@/utils/earthquakeApi';
import EarthquakeMap from '@/components/EarthquakeMap';

interface EarthquakeMapContainerProps {
  earthquakes: Earthquake[];
  selectedEarthquake: Earthquake | null;
  onSelectEarthquake: (earthquake: Earthquake | null) => void;
  feltReports: Array<{time: number, coordinates: [number, number]}>;
}

const EarthquakeMapContainer: React.FC<EarthquakeMapContainerProps> = ({ 
  earthquakes, 
  selectedEarthquake, 
  onSelectEarthquake,
  feltReports
}) => {
  // Handle earthquake selection
  const handleSelectEarthquake = (earthquake: Earthquake | null) => {
    onSelectEarthquake(earthquake);
  };

  return (
    <EarthquakeMap 
      earthquakes={earthquakes}
      selectedEarthquake={selectedEarthquake}
      onSelectEarthquake={handleSelectEarthquake}
      feltReports={feltReports}
    />
  );
};

export default EarthquakeMapContainer;
