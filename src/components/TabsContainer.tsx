
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EarthquakeList from '@/components/EarthquakeList';
import EarthquakeHistory from '@/components/EarthquakeHistory';
import SafetyTips from '@/components/SafetyTips';
import { Earthquake } from '@/utils/earthquakeApi';
import { useLanguage } from '@/contexts/LanguageContext';

interface TabsContainerProps {
  filteredEarthquakes: Earthquake[];
  allEarthquakeHistory: Earthquake[];
  onSelectEarthquake: (earthquake: Earthquake | null) => void;
  loading: boolean;
}

const TabsContainer: React.FC<TabsContainerProps> = ({ 
  filteredEarthquakes, 
  allEarthquakeHistory, 
  onSelectEarthquake,
  loading
}) => {
  const { t } = useLanguage();

  return (
    <Tabs defaultValue="earthquakes" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="earthquakes">
          {t('recentEarthquakes')}
        </TabsTrigger>
        <TabsTrigger value="history">
          {t('earthquakeHistory')}
        </TabsTrigger>
        <TabsTrigger value="tips">
          {t('safetyTips')}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="earthquakes" className="mt-0">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-center space-y-2">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              <p className="text-sm text-muted-foreground">{t('loadingData')}</p>
            </div>
          </div>
        ) : (
          <EarthquakeList 
            earthquakes={filteredEarthquakes} 
            onSelectEarthquake={onSelectEarthquake}
          />
        )}
      </TabsContent>
      
      <TabsContent value="history" className="mt-0">
        <EarthquakeHistory earthquakeHistory={allEarthquakeHistory} />
      </TabsContent>
      
      <TabsContent value="tips" className="mt-0">
        <SafetyTips />
      </TabsContent>
    </Tabs>
  );
};

export default TabsContainer;
