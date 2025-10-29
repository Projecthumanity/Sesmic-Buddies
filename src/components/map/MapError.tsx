
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Earthquake } from '../../utils/earthquakeApi';
import { getMagnitudeColor } from '../../utils/formatters';

interface MapErrorProps {
  errorMessage: string;
  earthquakes: Earthquake[];
  onSelectEarthquake: (earthquake: Earthquake | null) => void;
}

const MapError: React.FC<MapErrorProps> = ({ errorMessage, earthquakes, onSelectEarthquake }) => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-md border bg-muted/20 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{t('mapErrorTitle') || 'Map Error'}</h3>
      <p className="text-muted-foreground mb-4">{errorMessage}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
        {earthquakes.map(quake => (
          <div 
            key={quake.id} 
            className="flex items-center p-3 bg-card rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectEarthquake(quake)}
          >
            <div className="mr-2 w-4 h-4 rounded-full" style={{ backgroundColor: getMagnitudeColor(quake.magnitude).replace('bg-', '') }}></div>
            <div>
              <div className="font-medium">M{quake.magnitude.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">{quake.place}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapError;
