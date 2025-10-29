
import React, { useMemo, useRef, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Earthquake } from '../../utils/earthquakeApi';
import { createEarthquakeIcon } from '../../utils/mapMarkerUtils';

interface EarthquakeMarkerProps {
  earthquake: Earthquake;
  onSelectEarthquake: (earthquake: Earthquake) => void;
  isSelected?: boolean;
}

const EarthquakeMarker: React.FC<EarthquakeMarkerProps> = ({
  earthquake,
  onSelectEarthquake,
  isSelected,
}) => {
  const [longitude, latitude] = earthquake.coordinates;
  
  const map = useMap();

  const icon = useMemo(
    () => createEarthquakeIcon(earthquake.magnitude, earthquake.source),
    [earthquake.magnitude, earthquake.source]
  );

  // When selected, open the popup after the map finishes moving to avoid autopan conflicts
  useEffect(() => {
    if (!isSelected) return;

    const openPopup = () => {
      try {
        // find the marker layer by matching coordinates and open its popup
        map.eachLayer((layer: L.Layer) => {
          if (layer instanceof L.Marker) {
            const ll = (layer as L.Marker).getLatLng();
            // compare lat/lng with small tolerance
            if (Math.abs(ll.lat - latitude) < 1e-6 && Math.abs(ll.lng - longitude) < 1e-6) {
              layer.openPopup();
            }
          }
        });
      } catch (e) {
        // ignore
      }
    };

    const onMoveEnd = () => openPopup();
    map.once('moveend', onMoveEnd);
    const fallback = window.setTimeout(openPopup, 1200);

    return () => {
      map.off('moveend', onMoveEnd);
      clearTimeout(fallback);
    };
  }, [isSelected, map, latitude, longitude]);

  return (
    <Marker
      position={[latitude, longitude]}
      icon={icon}
      eventHandlers={{
        click: () => {
          // close any open popup immediately to avoid Leaflet autopan during map.setView
          try {
            map.closePopup();
          } catch (err) {
            // ignore
          }
          onSelectEarthquake(earthquake);
        }
      }}
    />
  );
};

export default EarthquakeMarker;
