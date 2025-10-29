
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AlertSettings from '@/components/AlertSettings';
import FeltItButton from '@/components/FeltItButton';

interface HeaderSectionProps {
  thresholdMagnitude: number;
  setThresholdMagnitude: (value: number) => void;
  thresholdDistance: number;
  setThresholdDistance: (value: number) => void;
  muted: boolean;
  setMuted: (value: boolean) => void;
  onFeltReport: (report: { time: number; coordinates: [number, number] }) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  thresholdMagnitude,
  setThresholdMagnitude,
  thresholdDistance,
  setThresholdDistance,
  muted,
  setMuted,
  onFeltReport
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-2">
          {t('pageTitle')}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
          {t('pageDescription')}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
        <AlertSettings 
          threshold={thresholdMagnitude}
          setThreshold={setThresholdMagnitude}
          muted={muted}
          setMuted={setMuted}
          distance={thresholdDistance}
          setDistance={setThresholdDistance}
        />
        <FeltItButton onReport={onFeltReport} />
      </div>
    </div>
  );
};

export default HeaderSection;
