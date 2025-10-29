
// Format a date to a readable string
export const formatDate = (date: Date): string => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // difference in seconds
  
  // If less than a minute
  if (diff < 60) {
    return `${diff} seconds ago`;
  }
  
  // If less than an hour
  if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`;
  }
  
  // If less than a day
  if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`;
  }
  
  // For events older than a day, show the date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format magnitude to 1 decimal place
export const formatMagnitude = (magnitude: number): string => {
  return magnitude.toFixed(1);
};

// Format location to show only the important part
export const formatLocation = (location: string): string => {
  // Remove "km" part if it exists
  const locationParts = location.split(',');
  if (locationParts.length > 1) {
    return locationParts.slice(1).join(',').trim();
  }
  return location;
};

// Convert a magnitude to a severity level for UI styling
export const getMagnitudeSeverity = (magnitude: number): 'low' | 'moderate' | 'high' | 'severe' => {
  if (magnitude < 4.0) return 'low';
  if (magnitude < 5.0) return 'moderate';
  if (magnitude < 6.0) return 'high';
  return 'severe';
};

// Get a color based on magnitude severity
export const getMagnitudeColor = (magnitude: number): string => {
  const severity = getMagnitudeSeverity(magnitude);
  
  switch (severity) {
    case 'low':
      return 'bg-green-500';
    case 'moderate':
      return 'bg-yellow-500';
    case 'high':
      return 'bg-orange-500';
    case 'severe':
      return 'bg-red-500';
    default:
      return 'bg-blue-500';
  }
};

// Get a subtle background color based on magnitude severity
export const getMagnitudeBackgroundColor = (magnitude: number): string => {
  const severity = getMagnitudeSeverity(magnitude);
  
  switch (severity) {
    case 'low':
      return 'bg-green-50 dark:bg-green-950/30';
    case 'moderate':
      return 'bg-yellow-50 dark:bg-yellow-950/30';
    case 'high':
      return 'bg-orange-50 dark:bg-orange-950/30';
    case 'severe':
      return 'bg-red-50 dark:bg-red-950/30';
    default:
      return 'bg-blue-50 dark:bg-blue-950/30';
  }
};

// Calculate distance between two coordinates
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};

// Format distance to a readable string
export const formatDistance = (distance: number): string => {
  // Round to one decimal place if less than 10km, otherwise round to nearest km
  if (distance < 10) {
    return `${distance.toFixed(1)}km`;
  } else {
    return `${Math.round(distance)}km`;
  }
};
