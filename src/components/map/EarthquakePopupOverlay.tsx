import React, { useEffect, useState, useRef } from 'react';
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
  const popupRef = useRef<HTMLDivElement | null>(null);

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
        // initial raw position in viewport coordinates
        const rawLeft = rect.left + point.x;
        const rawTop = rect.top + point.y;

        // If we have a measured popup, clamp to viewport so it never overflows horizontally or vertically
        const margin = 8; // px
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        let left = rawLeft;
        let top = rawTop;

        const popupEl = popupRef.current;
        if (popupEl) {
          const popupRect = popupEl.getBoundingClientRect();
          const pw = popupRect.width;
          const ph = popupRect.height;

          // prefer showing above the marker if it would overflow below
          if (rawTop + ph + margin > vh) {
            top = Math.max(margin, rawTop - ph - 12);
          }

          // clamp horizontally
          if (rawLeft + pw + margin > vw) {
            left = Math.max(margin, vw - pw - margin);
          }
          if (left < margin) left = margin;
        }

        setPos({ left, top });
      } catch (e) {
        setPos(null);
      }
    };

    // Wait for moveend to show overlay so it doesn't fight map autopan
    const showAfterMove = () => {
      updatePosition();
      // allow measurement after render
      setVisible(true);
      setTimeout(updatePosition, 50);
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
      ref={popupRef}
      style={{ position: 'fixed', left: pos.left, top: pos.top, zIndex: 60 }}
      className="max-w-sm w-11/12 sm:w-80 bg-background border rounded-md shadow-lg p-3"
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
