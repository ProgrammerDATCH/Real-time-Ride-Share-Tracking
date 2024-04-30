import { Coordinate } from "../interfaces";

interface Stop {
  name: string;
  location: Coordinate;
}


const calculateETA = async (
  from: Coordinate,
  to: Coordinate,
  intermediateStops: Coordinate[],
  setRouteFunction: Function,
  setRouteInfo: Function
) => {
  const directionsService = new google.maps.DirectionsService();
  const waypoints = intermediateStops.map((stop) => ({
    location: new google.maps.LatLng(stop.lat, stop.lng),
    stopover: true,
  }));
  const request = {
    origin: new google.maps.LatLng(from.lat, from.lng),
    destination: new google.maps.LatLng(to.lat, to.lng),
    waypoints: waypoints,
    travelMode: google.maps.TravelMode.DRIVING,
  };
  try {
    const response = await directionsService.route(request);
    if (response && response.routes && response.routes.length > 0) {
      const route = response.routes[0];
      if (route && route.legs && route.legs.length > 0) {
        const leg = route.legs[0];
        setRouteInfo(leg);
      }
    }
    setRouteFunction(response);
  } catch (error) {
    console.error('Error fetching directions:', error);
  }
};



const getNearestStop = (currentLocation: Coordinate, stops: Stop[]): Coordinate | null => {
  let nearestStop: Stop | null = null;
  let nearestDistance: number = Number.MAX_SAFE_INTEGER;
  stops.forEach(stop => {
    const distance = calculateDistance(currentLocation, stop.location);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestStop = stop;
    }
  });

  return nearestStop ? (nearestStop as Stop).location : null;
};

const calculateDistance = (coord1: Coordinate, coord2: Coordinate): number => {
  const earthRadius = 6371; // Radius of the earth in km
  const latDiff = deg2rad(coord2.lat - coord1.lng);
  const lngDiff = deg2rad(coord2.lng - coord1.lng);
  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(deg2rad(coord1.lat)) *
      Math.cos(deg2rad(coord2.lat)) *
      Math.sin(lngDiff / 2) *
      Math.sin(lngDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c; // Distance in km
  return distance;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};



export {
    calculateETA
}