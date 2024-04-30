import { Coordinate } from "../interfaces";

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


export {
    calculateETA
}