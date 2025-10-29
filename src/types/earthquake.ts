
export interface Earthquake {
  id: string;
  magnitude: number;
  place: string;
  time: number;
  url: string;
  coordinates: [number, number, number]; // [longitude, latitude, depth]
  felt: number | null;
  tsunami: number;
  source?: string; // Added source property to identify data origin
}
