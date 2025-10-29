
// Audio utility for earthquake alerts

// AudioContext singleton to avoid creating multiple contexts
let audioContextInstance: AudioContext | null = null;

// Get or create audio context
const getAudioContext = (): AudioContext | null => {
  try {
    if (!audioContextInstance) {
      audioContextInstance = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextInstance;
  } catch (error) {
    console.error("Error creating AudioContext:", error);
    return null;
  }
};

// Function to play alert sound
export const playAlertSound = (volume = 1.0) => {
  const audioContext = getAudioContext();
  if (!audioContext) return false;
  
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect the nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set parameters for a more urgent alert sound (higher pitch, square wave)
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); 
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.1);
    
    // Set volume (increased for more impact)
    gainNode.gain.setValueAtTime(volume * 2.0, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
    
    // Play the sound with faster attack
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.4);
    
    return true;
  } catch (error) {
    console.error("Error playing alert sound:", error);
    return false;
  }
};

// Function to play notification sound (gentler than alert)
export const playNotificationSound = (volume = 0.7) => {
  const audioContext = getAudioContext();
  if (!audioContext) return false;
  
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect the nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set parameters
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.1);
    
    // Quick fade-in for more presence
    gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.7, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
    
    // Play the sound
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
    
    return true;
  } catch (error) {
    console.error("Error playing notification sound:", error);
    return false;
  }
};
