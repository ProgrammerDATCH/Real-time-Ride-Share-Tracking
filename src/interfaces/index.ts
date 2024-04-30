export interface Coordinate{
    lat: number;
    lng: number;
  }

export interface Leg {
  distance: { text: string; value: number };
  duration: { text: string; value: number };
  end_address: string;
  start_address: string;
  steps: any[];
}