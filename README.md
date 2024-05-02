# Real-time Ride-Share Tracking

## Hosted

This web is hosted on [https://real-time-ride-share-tracking-web.netlify.app](https://real-time-ride-share-tracking-web.netlify.app)

## Overview

This project is a web application for tracking a driver's route in real-time, specifically designed for a transportation agency in Kigali. The application utilizes the Google Maps API to display the route and calculate the estimated time of arrival (ETA) for each stop along the way.

## Features

- Interactive map displaying the entire route with marked stops.
- Real-time tracking of the driver's current location.
- Calculation and display of ETA for the next stop, assuming constant average speed.

## Approach

- **Map Integration**: Integrated the `@react-google-maps/api` library to render the map, display the route, and calculate ETAs for each stop. This library provides React components for seamless integration with Google Maps.

- **ETA Calculation**: Calculated the ETA for each stop using the response provided by the DirectionsService from the Google Maps API. The DirectionsService calculates the optimal route based on the provided waypoints and returns the route data, including distance and duration information.

- **Route Boundary Check**: Implemented a check to determine if the driver is within the route boundaries. This check is done by applying a bounding box to the route, with a buffer of 100 meters around the route. This ensures that the driver is considered "in route" when within this boundary.

  - **Geolocation API**: Utilized the Geolocation API provided by JavaScript to continuously monitor the driver's location changes. By keeping a watch on the driver's location, the application can update the route information and ensure accurate tracking.

- **Leg Update**: Updated the current leg of the route by calculating the distance between the driver's location and all legs of the route. The leg closest to the driver's location is considered the current leg. This allows for continuous updating of the current leg as the driver moves along the route.

- **Adjustable Route Boundary**: The route boundary check allows for adjustment of the boundary size to accommodate different scenarios. The 100-meter buffer can be adjusted as needed to suit the specific requirements of the transportation agency and the route.



## Technologies Used

- React.js for the front-end.
- Google Maps API for mapping and routing functionalities.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ProgrammerDATCH/Real-time-Ride-Share-Tracking.git
   ```
2. Install dependencies:

   ```bash
   npm run dev
   ```

3. Rename `.env.example` to `.env`

4. Add your Google Maps API key in .env file:
 ```javascript
VITE_GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';
```

5. Start the development server:
```bash
  npm run dev
```

5. Open your browser and navigate to `http://localhost:5173/` to view the application.

## Project Structure

- `src`:
  - `components`: Contains React components, including the map component.
    - `assets`: Contains images to use as markers.
    - `MapComponent.tsx`: Main map component for rendering Map.
    - `Moving.tsx`: Start page with icons and also render the map from MapComponent.tsx.
  - `constants`: Contains constants Data.
    - `coordinates.ts`: Contains coordinates for entire route (Nyabugogo - Kimironko) + additional I added for testing.
  - `interfaces`: Contains interfaces & types
    - `index.ts`: Contains interfaces like Coordinate,...
  - `utils`: Contains utilities and helpful functions I used in entire App.
    - `functionUtils.ts`: Contains useful functions like formatDuration(),...
    - `mapUtils.ts`: Contains map related functions like calculateETA(), ...
  - `App.tsx`: Main component that renders the application.
  - `main.tsx`: Entry point for the React application.
  - `.env.example`: Copy of .env file with variables

## Design

The application's UI closely matches the provided Figma design screenshot, with a clean and intuitive interface for easy navigation and tracking.

## Author

- TUYISHIME David

## Screenshots

![Satelite View](https://raw.githubusercontent.com/ProgrammerDATCH/images/main/real-time-ride-share/satelite.png)
![Map View](https://raw.githubusercontent.com/ProgrammerDATCH/images/main/real-time-ride-share/routes.png)
![Street View](https://raw.githubusercontent.com/ProgrammerDATCH/images/main/real-time-ride-share/real-time.png)