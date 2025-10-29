
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { Earthquake } from '@/utils/earthquakeApi';
import NavBar from '@/components/NavBar';
import HeaderSection from '@/components/HeaderSection';
import EarthquakeMapContainer from '@/components/EarthquakeMapContainer';
import TabsContainer from '@/components/TabsContainer';
import LocationPermission from '@/components/LocationPermission';
import { formatMagnitude, formatLocation } from '@/utils/formatters';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserLocation } from '@/hooks/use-user-location';
import { useEarthquakes } from '@/hooks/use-earthquakes';
import { useAlerts } from '@/hooks/use-alerts';
import { useFeltReports } from '@/hooks/use-felt-reports';
import { useAlertSettings } from '@/hooks/use-alert-settings';
import { subscribeToEarthquakes } from '@/utils/earthquakeApi';

const Index = () => {
  const { t } = useLanguage();
  const [selectedEarthquake, setSelectedEarthquake] = useState<Earthquake | null>(null);
  
  // Custom hooks
  const { 
    userLocation, 
    requestLocation, 
    hasPermission 
  } = useUserLocation();
  
  const { 
    thresholdMagnitude, 
    setThresholdMagnitude, 
    thresholdDistance, 
    setThresholdDistance,
    muted,
    setMuted
  } = useAlertSettings();
  
  const handleLocationGranted = useCallback((position: GeolocationPosition) => {
    requestLocation();
  }, [requestLocation]);
  
  const { 
    filteredEarthquakes, 
    allEarthquakeHistory, 
    loading, 
    isEarthquakeNearby,
    handleNewEarthquakes
  } = useEarthquakes({
    thresholdMagnitude,
    userLocation,
    thresholdDistance
  });

  // track initial subscription payload so we don't make startup noises
  const isInitialRef = useRef(true);
  
  const { processNewEarthquakes, playNotificationSound } = useAlerts({
    thresholdMagnitude,
    muted,
    isEarthquakeNearby
  });
  
  const { feltReports, handleFeltReport } = useFeltReports();

  // Subscribe to earthquake data
  useEffect(() => {
    const subscription = subscribeToEarthquakes((data) => {
      const newEarthquakes = handleNewEarthquakes(data);
      // Don't play sounds/notifications for the initial bulk load
      if (isInitialRef.current) {
        isInitialRef.current = false;
        return;
      }
      processNewEarthquakes(newEarthquakes);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [handleNewEarthquakes, processNewEarthquakes]);

  // Function to handle earthquake selection (nullable for deselect)
  const handleSelectEarthquake = (earthquake: Earthquake | null) => {
    setSelectedEarthquake(earthquake);
    if (!earthquake) return;

    toast.info(
      `Magnitude ${formatMagnitude(earthquake.magnitude)} earthquake`,
      {
        description: formatLocation(earthquake.place),
        duration: 3000,
      }
    );
  };

  // Function to handle user felt reports with sound
  const handleFeltReportWithSound = (report: { time: number; coordinates: [number, number] }) => {
    handleFeltReport(report);
    
    if (!muted) {
      playNotificationSound(0.4);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 page-transition">
      <LocationPermission onLocationGranted={handleLocationGranted} />
      <NavBar />
      
      <main className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6 sm:space-y-8">
        <HeaderSection 
          thresholdMagnitude={thresholdMagnitude}
          setThresholdMagnitude={setThresholdMagnitude}
          thresholdDistance={thresholdDistance}
          setThresholdDistance={setThresholdDistance}
          muted={muted}
          setMuted={setMuted}
          onFeltReport={handleFeltReportWithSound}
        />
        
        <EarthquakeMapContainer 
          earthquakes={filteredEarthquakes}
          selectedEarthquake={selectedEarthquake}
          onSelectEarthquake={handleSelectEarthquake}
          feltReports={feltReports}
        />
        
        <TabsContainer 
          filteredEarthquakes={filteredEarthquakes}
          allEarthquakeHistory={allEarthquakeHistory}
          onSelectEarthquake={handleSelectEarthquake}
          loading={loading}
        />
      </main>
      
      <footer className="mt-10 py-8 border-t">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <div className="flex flex-col space-y-6">
            <div>
              <p className="text-lg text-center font-medium mb-4">{t('footerText')}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border bg-card">
                  <p className="font-medium">{t('footerGeoNet')}</p>
                  <p className="text-sm text-muted-foreground">New Zealand</p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <p className="font-medium">{t('footerEmsc')}</p>
                  <p className="text-sm text-muted-foreground">Europe</p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <p className="font-medium">{t('footerUsgs')}</p>
                  <p className="text-sm text-muted-foreground">United States</p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <p className="font-medium">{t('footerJma')}</p>
                  <p className="text-sm text-muted-foreground">Japan</p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <p className="font-medium">{t('footerGlobalQuake')}</p>
                  <p className="text-sm text-muted-foreground">Global</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 grid gap-4 text-center">
              <p className="text-sm text-primary">{t('dataUpdateFrequency')}</p>
              <p className="text-sm text-muted-foreground italic">{t('dataDisclaimer')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
