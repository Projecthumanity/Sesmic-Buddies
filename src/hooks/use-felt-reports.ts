
import { useState, useCallback } from 'react';

export const useFeltReports = () => {
  const [feltReports, setFeltReports] = useState<Array<{time: number, coordinates: [number, number]}>>([]);
  
  const handleFeltReport = useCallback((report: { time: number; coordinates: [number, number] }) => {
    setFeltReports(prev => [...prev, report]);
    
    // In a real app, you would send this to a backend API
    console.log('User felt report:', report);
  }, []);

  return { feltReports, handleFeltReport };
};
