import { useState, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer
} from '@react-google-maps/api';
import route from '../constants/coordinates';
import { bus_in_map } from './assets';
import { calculateETA } from '../utils/mapUtils';


const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapComponent = ({ setRouteInfo }: any) => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number }>({
    lat: route.startingPoint.lat,
    lng: route.startingPoint.lng,
  });
  const [directionsResponse, setDirectionsResponse] = useState<
    google.maps.DirectionsResult | null
  >(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
      (error) => console.error('Error fetching location:', error)
    );
  
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);
  

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    libraries: ['places'],
  });


  useEffect(() => {
    const from = { lat: route.startingPoint.lat, lng: route.startingPoint.lng }
    const intermediateStops = route.intermediateStops;
    const to = { lat: route.endingPoint.lat, lng: route.endingPoint.lng }
    isLoaded && calculateETA(from, to, intermediateStops, setDirectionsResponse, setRouteInfo);
  }, [isLoaded])

  const renderMap = () => (
    <GoogleMap
      zoom={10}
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={currentLocation}
    >
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}

      <Marker
        position={currentLocation}
        icon={{
          url: bus_in_map,
          scaledSize: new google.maps.Size(50, 50),
        }}
      />
    </GoogleMap>
  );
  
  return (
    <>
      {loadError && <div>Map loading error</div>}
      {!isLoaded && <div>Loading map...</div>}
      {isLoaded && renderMap()}
    </>
  );
};

export default MapComponent;