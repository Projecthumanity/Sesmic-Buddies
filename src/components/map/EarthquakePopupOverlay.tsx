import React, { useEffect, useState } from 'react';
import { Earthquake } from '@/utils/earthquakeApi';
import L from 'leaflet';

interface Props {
  earthquake: Earthquake | null;
  onClose: () => void;
  map: L.Map | null;
}

const EarthquakePopupOverlay: React.FC<Props> = ({ earthquake, onClose, map }) => {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!earthquake || !map) {
      setVisible(false);
      setPos(null);
      return;
    }

    const updatePosition = () => {
      try {
        const [lon, lat] = earthquake.coordinates;
        const point = map.latLngToContainerPoint(L.latLng(lat, lon));
        const rect = (map.getContainer() as HTMLElement).getBoundingClientRect();
        setPos({ left: rect.left + point.x, top: rect.top + point.y });
      } catch (e) {
        setPos(null);
      }
    };

    // Wait for moveend to show overlay so it doesn't fight map autopan
    const showAfterMove = () => {
      updatePosition();
      setVisible(true);
    };

  map.once('moveend', showAfterMove);
  const fallback = window.setTimeout(showAfterMove, 1200);

  // Also update on move/zoom/resize
  map.on('move', updatePosition);
  map.on('zoom', updatePosition);
  window.addEventListener('resize', updatePosition);

    // initial position
    updatePosition();

    return () => {
      map.off('move', updatePosition);
      map.off('zoom', updatePosition);
      map.off('moveend', showAfterMove);
      window.removeEventListener('resize', updatePosition);
      clearTimeout(fallback);
    };
  }, [earthquake, map]);

  if (!earthquake || !pos || !visible) return null;

  return (
    <div
      style={{ position: 'fixed', left: pos.left, top: pos.top, zIndex: 60 }}
      className="max-w-sm w-80 bg-background border rounded-md shadow-lg p-3"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-lg font-bold">M{earthquake.magnitude.toFixed(1)}</div>
          <div className="text-sm text-muted-foreground">{earthquake.place}</div>
        </div>
        <button onClick={onClose} aria-label="Close" className="ml-3 text-sm text-muted-foreground">✕</button>
      </div>

      <div className="mt-2 text-sm space-y-1">
        <div><span className="text-muted-foreground">Time:</span> {new Date(earthquake.time).toLocaleString()}</div>
        <div><span className="text-muted-foreground">Depth:</span> {earthquake.coordinates[2].toFixed(1)} km</div>
        <div><span className="text-muted-foreground">Coordinates:</span> {earthquake.coordinates[1].toFixed(3)}°, {earthquake.coordinates[0].toFixed(3)}°</div>
        {earthquake.felt && (<div><span className="text-muted-foreground">Felt reports:</span> {earthquake.felt}</div>)}
        {earthquake.tsunami > 0 && (<div className="text-red-500 font-medium">⚠️ Tsunami Alert</div>)}
      </div>

      {earthquake.source && (
        <div className="mt-3 text-xs text-muted-foreground border-t pt-2">Source: {earthquake.source}</div>
      )}
    </div>
  );
};

export default EarthquakePopupOverlay;
