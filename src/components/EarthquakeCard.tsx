
import React from 'react';
import { ExternalLink, MapPin, Clock, Activity, Globe } from 'lucide-react';
import { Earthquake } from '../utils/earthquakeApi';
import { formatDate, formatMagnitude, formatLocation, getMagnitudeBackgroundColor, getMagnitudeSeverity } from '../utils/formatters';

interface EarthquakeCardProps {
  earthquake: Earthquake;
  onClick?: () => void;
}

const EarthquakeCard: React.FC<EarthquakeCardProps> = ({ earthquake, onClick }) => {
  const { magnitude, place, time, url, source } = earthquake;
  const date = new Date(time);
  const severityClass = getMagnitudeBackgroundColor(magnitude);
  const severity = getMagnitudeSeverity(magnitude);
  
  // Get text color based on severity
  const getTextColor = () => {
    switch (severity) {
      case 'low':
        return 'text-green-700 dark:text-green-400';
      case 'moderate':
        return 'text-yellow-700 dark:text-yellow-400';
      case 'high':
        return 'text-orange-700 dark:text-orange-400';
      case 'severe':
        return 'text-red-700 dark:text-red-400';
      default:
        return 'text-primary';
    }
  };

  // Add a badge for data source
  const getSourceBadge = () => {
    if (source === 'GlobalQuake') {
      return <span className="ml-1 px-1.5 py-0.5 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 rounded-md">GQ</span>;
    }
    if (source === 'USGS') {
      return <span className="ml-1 px-1.5 py-0.5 text-xs bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 rounded-md">USGS</span>;
    }
    return null;
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${severityClass} card-hover cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Activity className={`h-4 w-4 ${getTextColor()}`} />
            <span className={`text-xs font-semibold uppercase ${getTextColor()}`}>
              {severity} intensity
            </span>
          </div>
          <h3 className="text-lg font-semibold text-card-foreground">
            {formatLocation(place)}
            {getSourceBadge()}
          </h3>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getTextColor()} bg-background/90 font-display font-bold`}>
          {formatMagnitude(magnitude)}
        </div>
      </div>
      
      <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <MapPin className="h-3.5 w-3.5" />
          <span>{place.split(',')[0].trim()}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{formatDate(date)}</span>
        </div>
        {source && (
          <div className="flex items-center space-x-1">
            <Globe className="h-3.5 w-3.5" />
            <span>{source}</span>
          </div>
        )}
      </div>
      
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 text-muted-foreground hover:text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
};

export default EarthquakeCard;
