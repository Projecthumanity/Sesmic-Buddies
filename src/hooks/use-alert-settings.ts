
import { useState } from 'react';

export const useAlertSettings = (initialThreshold = 4.0, initialDistance = 500, initialMuted = false) => {
  const [thresholdMagnitude, setThresholdMagnitude] = useState(initialThreshold);
  const [thresholdDistance, setThresholdDistance] = useState(initialDistance);
  const [muted, setMuted] = useState(initialMuted);

  return {
    thresholdMagnitude,
    setThresholdMagnitude,
    thresholdDistance,
    setThresholdDistance,
    muted,
    setMuted
  };
};
