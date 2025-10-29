
import React from 'react';
import { History } from 'lucide-react';
import { Earthquake } from '../utils/earthquakeApi';
import { formatDate, formatMagnitude, formatLocation } from '../utils/formatters';
import { useLanguage } from '../contexts/LanguageContext';

interface EarthquakeHistoryProps {
  earthquakeHistory: Earthquake[];
}

const EarthquakeHistory: React.FC<EarthquakeHistoryProps> = ({ 
  earthquakeHistory 
}) => {
  const { t } = useLanguage();
  
  // Get earthquakes from the last 24 hours
  const last24Hours = Date.now() - 24 * 60 * 60 * 1000;
  const recentHistory = earthquakeHistory
    .filter(eq => eq.time > last24Hours)
    .sort((a, b) => b.time - a.time);
  
  return (
    <div className="w-full space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-semibold tracking-tight flex items-center gap-2">
          <History className="h-5 w-5" />
          <span>{t('earthquakeHistory')}</span>
        </h2>
        <span className="text-sm text-muted-foreground">
          {t('last24Hours')}
        </span>
      </div>
      
      {recentHistory.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground">{t('noHistory')}</p>
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium">Mag</th>
                  <th className="px-4 py-2 text-left font-medium">Location</th>
                  <th className="px-4 py-2 text-left font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentHistory.map((eq) => {
                  const severityClass = getSeverityClass(eq.magnitude);
                  
                  return (
                    <tr key={eq.id} className="border-b hover:bg-muted/30 transition-colors animate-scale">
                      <td className="px-4 py-2">
                        <span className={`inline-block px-2 rounded text-white ${severityClass}`}>
                          {formatMagnitude(eq.magnitude)}
                        </span>
                      </td>
                      <td className="px-4 py-2">{formatLocation(eq.place)}</td>
                      <td className="px-4 py-2">{formatDate(new Date(eq.time))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get severity class
const getSeverityClass = (magnitude: number): string => {
  if (magnitude >= 6.0) return 'bg-red-500';
  if (magnitude >= 5.0) return 'bg-orange-500';
  if (magnitude >= 4.0) return 'bg-yellow-500';
  return 'bg-green-500';
};

export default EarthquakeHistory;
