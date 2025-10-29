
import React, { useState } from 'react';
import { Hand } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';

interface FeltItButtonProps {
  onReport: (report: { time: number; coordinates: [number, number] }) => void;
}

const FeltItButton: React.FC<FeltItButtonProps> = ({ onReport }) => {
  const { t } = useLanguage();
  const [isReporting, setIsReporting] = useState(false);
  
  // Default coordinates (center of Kathmandu)
  const defaultCoordinates: [number, number] = [85.3240, 27.7172];
  
  const handleFeltIt = () => {
    setIsReporting(true);
    
    // Create a report with timestamp and user's location (or default to Kathmandu)
    const report = {
      time: Date.now(),
      coordinates: defaultCoordinates
    };
    
    // Try to get the user's actual location if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userReport = {
            time: Date.now(),
            coordinates: [position.coords.longitude, position.coords.latitude] as [number, number]
          };
          
          onReport(userReport);
          toast.success(t('thankYou'), {
            duration: 3000,
          });
          setIsReporting(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fall back to default location
          onReport(report);
          toast.success(t('thankYou'), {
            duration: 3000,
          });
          setIsReporting(false);
        }
      );
    } else {
      // Geolocation not supported, use default location
      onReport(report);
      toast.success(t('thankYou'), {
        duration: 3000,
      });
      setIsReporting(false);
    }
  };
  
  return (
    <button
      className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors animate-pulse-light"
      onClick={handleFeltIt}
      disabled={isReporting}
    >
      <Hand className="h-5 w-5" />
      <span>{isReporting ? '...' : t('feltIt')}</span>
    </button>
  );
};

export default FeltItButton;
