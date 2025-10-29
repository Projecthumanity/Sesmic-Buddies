
import { useState, useEffect, useCallback } from 'react';

interface UseUserLocationResult {
  userLocation: [number, number] | null;
  locationError: string | null;
  requestLocation: () => void;
  hasPermission: boolean;
}

export const useUserLocation = (): UseUserLocationResult => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.longitude, position.coords.latitude]);
        setLocationError(null);
        setHasPermission(true);
      },
      (error) => {
        console.warn("Geolocation error:", error);
        setLocationError(error.message);
        setHasPermission(error.code !== 1); // code 1 is permission denied
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  }, []);

  useEffect(() => {
    // Check if we have permission
    navigator.permissions?.query({ name: 'geolocation' })
      .then(result => {
        setHasPermission(result.state === 'granted');
        if (result.state === 'granted') {
          requestLocation();
        }
      })
      .catch(() => {
        // If we can't check permissions, try requesting location
        requestLocation();
      });
  }, [requestLocation]);

  return {
    userLocation,
    locationError,
    requestLocation,
    hasPermission
  };
};
