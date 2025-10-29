
import React, { useEffect, useState, useCallback } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface LocationPermissionProps {
  onLocationGranted: (position: GeolocationPosition) => void;
}

const LocationPermission: React.FC<LocationPermissionProps> = ({ onLocationGranted }) => {
  const [showDialog, setShowDialog] = useState(false);
  const { t } = useLanguage();

  const requestLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationGranted(position);
        toast.success(t("locationAccessGranted"), {
          description: t("locationNotificationsEnabled")
        });
      },
      (error) => {
        console.warn("Location error:", error);
        if (error.code === 1) { // Permission denied
          toast.error(t("locationAccessDenied"), {
            description: t("locationNotificationsDisabled")
          });
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  }, [onLocationGranted, t]);

  useEffect(() => {
    // Check if we've already asked for permission
    const hasAsked = localStorage.getItem('locationPermissionAsked');
    
    if (hasAsked) {
      // If we've asked before, check if we have permission
      navigator.permissions?.query({ name: 'geolocation' })
        .then(result => {
          if (result.state === 'granted') {
            requestLocation();
          }
        })
        .catch(() => {
          // If we can't check permissions, try to get location directly
          requestLocation();
        });
    } else {
      // If we haven't asked before, show the dialog
      setShowDialog(true);
    }
  }, [requestLocation]);

  const handleContinue = () => {
    localStorage.setItem('locationPermissionAsked', 'true');
    setShowDialog(false);
    requestLocation();
  };

  const handleSkip = () => {
    localStorage.setItem('locationPermissionAsked', 'true');
    setShowDialog(false);
    toast.info(t("locationSkipped"), {
      description: t("locationSkippedDescription")
    });
  };

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("allowLocationAccess")}</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>{t("locationPermissionDescription")}</p>
            <p className="text-sm text-muted-foreground">{t("locationOptionalNote")}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <button
            onClick={handleSkip}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("skipLocation")}
          </button>
          <AlertDialogAction onClick={handleContinue}>
            {t("enableLocation")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LocationPermission;
