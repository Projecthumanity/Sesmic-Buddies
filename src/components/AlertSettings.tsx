import React, { useState, useRef } from 'react';
import { Bell, Volume2, VolumeX, Sliders } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useOnClickOutside } from '@/hooks/use-click-outside';

interface AlertSettingsProps {
  threshold: number;
  setThreshold: (value: number) => void;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  distance: number;
  setDistance: (distance: number) => void;
}

const AlertSettings: React.FC<AlertSettingsProps> = ({
  threshold,
  setThreshold,
  muted,
  setMuted,
  distance,
  setDistance
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-secondary button-hover"
        aria-label="Alert Settings"
      >
        <Sliders className="h-4 w-4" />
        <span className="text-sm font-medium">Alert Settings</span>
      </button>

      {isOpen && (
        <div className="absolute z-[1000] mt-2 rounded-xl border bg-card p-4 shadow-elevated animate-fade-in max-h-[90vh] overflow-y-auto"
             style={{ 
               right: 0, 
               width: "min(300px, 90vw)",
               maxWidth: "calc(100vw - 20px)" 
             }}>
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center space-x-2">
              <Bell className="h-4 w-4 text-primary" />
              <span>Alert Settings</span>
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="magnitude-threshold" className="text-sm font-medium">
                  Magnitude Threshold: {threshold.toFixed(1)}
                </label>
                <span className="text-xs text-muted-foreground">
                  {threshold < 3 ? 'Low' : threshold < 5 ? 'Medium' : 'High'}
                </span>
              </div>
              <Slider
                id="magnitude-threshold"
                min={1}
                max={7}
                step={0.1}
                value={[threshold]}
                onValueChange={(value) => setThreshold(value[0])}
                className="py-1"
              />
              <p className="text-xs text-muted-foreground">
                Receive alerts for earthquakes with magnitude {threshold.toFixed(1)} or higher.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="distance-threshold" className="text-sm font-medium">
                  Distance (km): {distance}
                </label>
                <span className="text-xs text-muted-foreground">
                  {distance < 50 ? 'Near' : distance < 200 ? 'Regional' : 'Far'}
                </span>
              </div>
              <Slider
                id="distance-threshold"
                min={50}
                max={1000}
                step={50}
                value={[distance]}
                onValueChange={(value) => setDistance(value[0])}
                className="py-1"
              />
              <p className="text-xs text-muted-foreground">
                Receive alerts for earthquakes within {distance}km from your location.
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                {muted ? (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Volume2 className="h-4 w-4 text-primary" />
                )}
                <span className="text-sm font-medium">Sound Alerts</span>
              </div>
              <Switch
                checked={!muted}
                onCheckedChange={(checked) => setMuted(!checked)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertSettings;
