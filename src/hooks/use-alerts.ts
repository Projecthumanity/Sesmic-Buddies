
import { useCallback } from 'react';
import { toast } from 'sonner';
import { Earthquake } from '@/types/earthquake';
import { formatMagnitude, formatLocation } from '@/utils/formatters';
import { playAlertSound, playNotificationSound } from '@/utils/audioUtils';
import { useLanguage } from '@/contexts/LanguageContext';

interface UseAlertsOptions {
  thresholdMagnitude: number;
  muted: boolean;
  isEarthquakeNearby: (earthquake: Earthquake) => boolean;
}

export const useAlerts = ({ thresholdMagnitude, muted, isEarthquakeNearby }: UseAlertsOptions) => {
  const { t } = useLanguage();

  // Throttle mechanism to avoid too many sounds at once
  let lastSoundTimestamp = 0;

  const playAlertForEarthquake = useCallback((earthquake: Earthquake) => {
    if (muted) return;
    
    const now = Date.now();
    // Don't play sounds too close together (within 1 second)
    if (now - lastSoundTimestamp < 1000) {
      return;
    }
    
    lastSoundTimestamp = now;
    const isNearby = isEarthquakeNearby(earthquake);
    
    if (earthquake.magnitude >= thresholdMagnitude) {
      if (isNearby) {
        playAlertSound(1.0);
      } else if (earthquake.magnitude >= thresholdMagnitude + 1) {
        // For high magnitude events above threshold, still play notification
        playNotificationSound(0.8);
      } else {
        playNotificationSound(0.6);
      }
    }
  }, [muted, isEarthquakeNearby, thresholdMagnitude]);

  const showNotification = useCallback((earthquake: Earthquake) => {
    const isNearby = isEarthquakeNearby(earthquake);
    
    if (earthquake.magnitude >= thresholdMagnitude) {
      const notificationType = isNearby ? 'error' : 'warning';
      const notificationTitle = isNearby 
        ? `${t('nearbyEarthquake')} - M${formatMagnitude(earthquake.magnitude)}`
        : `M${formatMagnitude(earthquake.magnitude)} ${t('earthquake')}`;
        
      toast[notificationType](
        notificationTitle,
        {
          description: formatLocation(earthquake.place),
          duration: isNearby ? 8000 : 5000,
        }
      );
      
      playAlertForEarthquake(earthquake);
    }
  }, [isEarthquakeNearby, thresholdMagnitude, t, playAlertForEarthquake]);

  const processNewEarthquakes = useCallback((newEarthquakes: Earthquake[]) => {
    if (newEarthquakes.length === 0) return;
    
    // Sort by magnitude (highest first) to prioritize more significant events
    const sortedEarthquakes = [...newEarthquakes].sort((a, b) => b.magnitude - a.magnitude);
    
    // Process one by one with slight delay to avoid overwhelming the user
    sortedEarthquakes.forEach((eq, index) => {
      setTimeout(() => {
        showNotification(eq);
      }, index * 300); // 300ms between notifications
    });
  }, [showNotification]);

  return { processNewEarthquakes, playNotificationSound };
};
