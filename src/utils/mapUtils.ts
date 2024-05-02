import { Coordinate } from "../interfaces";

const calculateETA = async (
  from: Coordinate,
  to: Coordinate,
  intermediateStops: Coordinate[],
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
    return response;
  } catch (error) {
    console.error('Error fetching directions:', error);
    return null;
  }
};


const isUserWithinRoute = (userLocation: Coordinate, route: any) => {
  const routeBounds = new google.maps.LatLngBounds();
  routeBounds.extend(new google.maps.LatLng(route.startingPoint.lat, route.startingPoint.lng));
  route.intermediateStops.forEach((stop: any) => {
    routeBounds.extend(new google.maps.LatLng(stop.lat, stop.lng));
  });
  routeBounds.extend(new google.maps.LatLng(route.endingPoint.lat, route.endingPoint.lng));

  const userLatLng = new google.maps.LatLng(userLocation.lat, userLocation.lng);
  return routeBounds.contains(userLatLng);
}

const updateLeg = (
  directionsResponse: google.maps.DirectionsResult | null,
  currentLocation: { lat: number; lng: number },
  setCurrentLegIndex: (index: number) => void
) => {
  if (!directionsResponse || !directionsResponse.routes || directionsResponse.routes.length === 0) {
    return;
  }
  const route = directionsResponse.routes[0];
  if (!route.legs || route.legs.length === 0) {
    return;
  }
  const distances = route.legs.map(leg => {
    const stopLocation = leg.end_location;
    return google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
      stopLocation
    );
  });
  const closestStopIndex = distances.indexOf(Math.min(...distances));
  setCurrentLegIndex(closestStopIndex);
};

export {
  calculateETA,
  isUserWithinRoute,
  updateLeg
};