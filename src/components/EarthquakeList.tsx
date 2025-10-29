
import React from 'react';
import { Earthquake } from '../utils/earthquakeApi';
import EarthquakeCard from './EarthquakeCard';
import { useLanguage } from '../contexts/LanguageContext';

interface EarthquakeListProps {
  earthquakes: Earthquake[];
  onSelectEarthquake: (earthquake: Earthquake) => void;
}

const EarthquakeList: React.FC<EarthquakeListProps> = ({ 
  earthquakes, 
  onSelectEarthquake 
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold tracking-tight">{t('recentEarthquakes')}</h2>
        <span className="text-sm text-muted-foreground">
          {earthquakes.length} {t('events')}
        </span>
      </div>
      
      {earthquakes.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground">{t('noEarthquakes')}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {earthquakes.map((earthquake) => (
            <div key={earthquake.id} className="animate-scale">
              <EarthquakeCard 
                earthquake={earthquake} 
                onClick={() => onSelectEarthquake(earthquake)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EarthquakeList;
