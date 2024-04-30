# Real-time Ride-Share Tracking

## Hosted

This web is hosted on [https://real-time-ride-share-tracking-web.netlify.app](https://real-time-ride-share-tracking-web.netlify.app)

## Overview

This project is a web application for tracking a driver's route in real-time, specifically designed for a transportation agency in Kigali. The application utilizes the Google Maps API to display the route and calculate the estimated time of arrival (ETA) for each stop along the way.

## Features

- Interactive map displaying the entire route with marked stops.
- Real-time tracking of the driver's current location.
- Calculation and display of ETA for the next stop, assuming constant average speed.

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
  npm start
```

5. Open your browser and navigate to `http://localhost:5173/` to view the application.

## Project Structure

- `src`:
  - `components`: Contains React components, including the map component.
    - `assets`: Contains images to use as marker
    - `MapComponent.tsx`: Main map component for showing Map.
    - `Moving.tsx`: Start page with icons and also render the map from MapComponent.tsx.
  - `constants`: Contains constants Data.
    - `coordinates.ts`: Contains coordinates for entire route (Nyabugogo - Kimironko).
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