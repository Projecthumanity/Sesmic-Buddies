
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { createFeltReportIcon } from '../../utils/mapMarkerUtils';
import { useLanguage } from '../../contexts/LanguageContext';

interface FeltReportMarkerProps {
  report: {
    time: number;
    coordinates: [number, number];
  };
  index: number;
}

const FeltReportMarker: React.FC<FeltReportMarkerProps> = ({ report, index }) => {
  const { t } = useLanguage();
  const [longitude, latitude] = report.coordinates;
  
  return (
    <Marker 
      key={`felt-${index}`} 
      position={[latitude, longitude]} 
      icon={createFeltReportIcon()}
      eventHandlers={{
        click: () => {
          // Handle click event if needed
        },
        mouseover: (e) => {
          e.target.openPopup();
        },
        mouseout: (e) => {
          e.target.closePopup();
        }
      }}
    >
      <Popup>
        <div className="p-2">
          <div className="font-bold mb-1 text-primary">{t('feltReport')}</div>
          <div className="text-sm text-muted-foreground">
            {new Date(report.time).toLocaleString()}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default FeltReportMarker;
