
import { toast } from "sonner";

// Re-export everything from the modular files
export type { Earthquake } from "@/types/earthquake";
export { fetchEarthquakesUSGS } from "./usgsEarthquakeApi";
export { fetchEarthquakesEMSC } from "./emscEarthquakeApi";
export { fetchEarthquakes } from "./earthquakeApiService";
export { subscribeToEarthquakes, REFRESH_INTERVAL } from "./earthquakeSubscriptionService";
