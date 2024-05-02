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


const updateLeg1 = (
  directionsResponse: google.maps.DirectionsResult | null,
  currentLegIndex: number,
  currentLocation: { lat: number; lng: number },
  setCurrentLegIndex: (index: number) => void,
  setInstruction: (instruction: string) => void
) => {
  if (!directionsResponse || !directionsResponse.routes || directionsResponse.routes.length === 0) {
    return;
  }

  const route = directionsResponse.routes[0];
  if (!route.legs || route.legs.length === 0) {
    return;
  }

  const leg = route.legs[currentLegIndex];
  if (!leg.steps || leg.steps.length === 0) {
    return;
  }

  // Determine current step based on user's location
  const currentStepIndex = leg.steps.findIndex(step => {
    const stepStartLocation = step.start_location;
    const stepEndLocation = step.end_location;
    return (
      currentLocation.lat >= stepStartLocation.lat() &&
      currentLocation.lat <= stepEndLocation.lat() &&
      currentLocation.lng >= stepStartLocation.lng() &&
      currentLocation.lng <= stepEndLocation.lng()
    );
  });

  if (currentStepIndex !== -1) {
    // Display instruction from the current step
    setInstruction(leg.steps[currentStepIndex].instructions);
  }

  // Shift to the next leg if the user has reached the end of the current leg
  if (currentStepIndex === leg.steps.length - 1 && currentLegIndex < route.legs.length - 1) {
    setCurrentLegIndex(currentLegIndex + 1);
  }
};


const updateLeg = (
  directionsResponse: google.maps.DirectionsResult | null,
  currentLocation: { lat: number; lng: number },
  setCurrentLegIndex: (index: number) => void,
  setInstruction: (instruction: string) => void
) => {
  if (!directionsResponse || !directionsResponse.routes || directionsResponse.routes.length === 0) {
    return;
  }

  const route = directionsResponse.routes[0];
  if (!route.legs || route.legs.length === 0) {
    return;
  }

  // Calculate distance to each stop and find the closest one
  const distances = route.legs.map(leg => {
    const stopLocation = leg.end_location;
    return google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
      stopLocation
    );
  });

  const closestStopIndex = distances.indexOf(Math.min(...distances));

  // Set the current leg index to the closest stop
  setCurrentLegIndex(closestStopIndex);

  // Display instruction from the current leg
  const closestLeg = route.legs[closestStopIndex];
  const currentStepIndex = closestLeg.steps.findIndex(step => {
    const stepStartLocation = step.start_location;
    const stepEndLocation = step.end_location;
    return (
      currentLocation.lat >= stepStartLocation.lat() &&
      currentLocation.lat <= stepEndLocation.lat() &&
      currentLocation.lng >= stepStartLocation.lng() &&
      currentLocation.lng <= stepEndLocation.lng()
    );
  });

  if (currentStepIndex !== -1) {
    setInstruction(closestLeg.steps[currentStepIndex].instructions);
  }
};



export {
  calculateETA,
  isUserWithinRoute,
  updateLeg,
  updateLeg1
};