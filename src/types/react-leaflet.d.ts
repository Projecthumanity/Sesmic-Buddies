
import { ReactNode } from 'react';
import { LatLngExpression, LatLngBounds, Map as LeafletMap, Marker as LeafletMarker, TileLayer as LeafletTileLayer } from 'leaflet';

declare module 'react-leaflet' {
  export interface MapContainerProps {
    children: ReactNode;
    style?: React.CSSProperties;
    center: LatLngExpression;
    zoom: number;
    attributionControl?: boolean;
    zoomControl?: boolean;
    scrollWheelZoom?: boolean;
    doubleClickZoom?: boolean;
    whenReady?: () => void;
  }

  export interface TileLayerProps {
    url: string;
    attribution: string;
  }

  export interface MarkerProps {
    position: LatLngExpression;
    icon?: L.Icon;
    eventHandlers?: {
      click?: () => void;
      mouseover?: (e: any) => void;
      mouseout?: (e: any) => void;
      dragend?: (e: any) => void;
      [key: string]: ((e?: any) => void) | undefined;
    };
  }

  export interface PopupProps {
    children: ReactNode;
  }

  export interface MapProps {
    center: LatLngExpression;
    zoom: number;
  }

  export function MapContainer(props: MapContainerProps): JSX.Element;
  export function TileLayer(props: TileLayerProps): JSX.Element;
  export function Marker(props: MarkerProps): JSX.Element;
  export function Popup(props: PopupProps): JSX.Element;
  export function useMap(): LeafletMap;
}
