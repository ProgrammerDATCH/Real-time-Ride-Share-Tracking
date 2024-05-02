import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { route } from '../constants/coordinates';
import { bus_in_map } from './assets';
import { calculateETA, isUserWithinRoute, updateLeg } from '../utils/mapUtils';
import { Coordinate } from '../interfaces';

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapComponent = ({ setRouteInfo, setStatus, setInstruction }: { setRouteInfo: (routeInfo: google.maps.DirectionsLeg | null) => void, setStatus: any, setInstruction: any }) => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number }>({
    lat: route.startingPoint.lat,
    lng: route.startingPoint.lng,
  });
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [currentLegIndex, setCurrentLegIndex] = useState<number>(0);



  const updateRouteIfWithinBoundaries = (userLocation: Coordinate) => {
    setCurrentLocation({ lat: userLocation.lat, lng: userLocation.lng })
    if (!isUserWithinRoute(userLocation, route)) {
      setStatus("Out of Route")
    }
    else {
      setStatus("Moving...")
      updateLeg(directionsResponse, currentLegIndex, currentLocation, setCurrentLegIndex, setInstruction)
    }
  }


  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        updateRouteIfWithinBoundaries({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
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
    // const from = { lat: currentLocation.lat, lng: currentLocation.lng }
    const from = { lat: route.startingPoint.lat, lng: route.startingPoint.lng }
    const to = { lat: route.endingPoint.lat, lng: route.endingPoint.lng }
    const intermediateStops = Object.values(route.intermediateStops);
    isLoaded && calculateETA(from, to, intermediateStops)
      .then((response) => {
        if (response && response.routes && response.routes.length > 0 && response.routes[0].legs && response.routes[0].legs.length > 0) {
          setRouteInfo(response.routes[0].legs[currentLegIndex]);
          setDirectionsResponse(response);
        } else {
          console.error('Invalid response format for ETA calculation:', response);
        }
      })
      .catch((error) => console.error('Error calculating ETA:', error));
  }, [currentLocation, isLoaded])


  const options = {
    polylineOptions: {
      strokeColor: 'green',
      strokeOpacity: 0.8,
      strokeWeight: 6,
    },
  };

  return (
    <>
      {loadError && <div>Map loading error</div>}
      {!isLoaded && <div>Loading map...</div>}
      {isLoaded && (
        <GoogleMap
          zoom={10}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={currentLocation}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} options={options} />
          )}

          <Marker
            position={currentLocation}
            icon={{
              url: bus_in_map,
              scaledSize: new google.maps.Size(50, 50),
            }}
          />

        </GoogleMap>
      )}
    </>
  );
};

export default MapComponent;
