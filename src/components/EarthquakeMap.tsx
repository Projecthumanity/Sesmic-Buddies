
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Earthquake } from '../utils/earthquakeApi';
import { useLanguage } from '../contexts/LanguageContext';
import L from 'leaflet';
import EarthquakeMarker from './map/EarthquakeMarker';
import FeltReportMarker from './map/FeltReportMarker';
import { FlyToEarthquake, FitBoundsToEarthquakes } from './map/MapControls';
import MapStyles from './map/MapStyles';
import MapError from './map/MapError';
import EarthquakePopupOverlay from './map/EarthquakePopupOverlay';

// Fix for Leaflet marker icon issue with bundlers
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to get the Leaflet map instance from inside MapContainer
const MapSetter: React.FC<{ onCreate: (map: L.Map) => void }> = ({ onCreate }) => {
  const map = useMap();
  useEffect(() => {
    onCreate(map);
  }, [map, onCreate]);
  return null;
};

interface EarthquakeMapProps {
  earthquakes: Earthquake[];
  selectedEarthquake: Earthquake | null;
  onSelectEarthquake: (earthquake: Earthquake | null) => void;
  feltReports?: Array<{time: number, coordinates: [number, number]}>;
}

const EarthquakeMap: React.FC<EarthquakeMapProps> = ({ 
  earthquakes, 
  selectedEarthquake, 
  onSelectEarthquake,
  feltReports = []
}) => {
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const { t } = useLanguage();
  
  // Set up the map loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (mapError) {
    return (
      <MapError 
        errorMessage={mapError} 
        earthquakes={earthquakes} 
        onSelectEarthquake={onSelectEarthquake} 
      />
    );
  }
  
  return (
  <div className="relative w-full h-[min(70vh,500px)] rounded-xl overflow-hidden shadow-md border animate-fade-in">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
          <div className="text-center space-y-2">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">{t('loadingMap')}</p>
          </div>
        </div>
      )}
      
      <MapContainer 
        style={{ height: '100%', width: '100%' }}
        center={[20, 0]}
        zoom={2}
        attributionControl={false}
        zoomControl={true}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        tap={false}
        whenReady={() => setMapLoaded(true)}
      >
        {/* helper inside MapContainer to expose map instance to parent */}
        <MapSetter onCreate={(m) => setMapInstance(m)} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {earthquakes.map(earthquake => (
          <EarthquakeMarker 
            key={earthquake.id}
            earthquake={earthquake} 
            onSelectEarthquake={onSelectEarthquake} 
          />
        ))}
        
        {feltReports.map((report, index) => (
          <FeltReportMarker 
            key={`felt-${index}`}
            report={report} 
            index={index} 
          />
        ))}
        
        <FlyToEarthquake selectedEarthquake={selectedEarthquake} />
        
        {earthquakes.length > 0 && <FitBoundsToEarthquakes earthquakes={earthquakes} />}
      </MapContainer>

      {/* Floating popup overlay (renders outside of Leaflet's popup system) */}
      <EarthquakePopupOverlay
        earthquake={selectedEarthquake}
        onClose={() => onSelectEarthquake(null)}
        map={mapInstance}
      />
      
      <div className="absolute bottom-2 right-2 z-[5] bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-muted-foreground">
        <span>
          {earthquakes.length} {earthquakes.length === 1 ? t('earthquake') : t('earthquakes')} {t('displayed')}
        </span>
      </div>
      
      <MapStyles />
    </div>
  );
};

export default EarthquakeMap;
