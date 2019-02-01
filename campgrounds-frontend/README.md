# Campgrounds Front End 🏕
React Version 16.6.3

Make sure to have the Rails back end running first before starting the front end.

1. Change directory into campgrounds-frontend.
2. Install all required packages using `npm install`.
3. Start the development server using `npm start`.
4. React should alert you to the fact that the Rails server is already running on default port `localhost:3000`. When it asks if you want to use a different port please respond with `Y` and it will use the next available port (ex. `localhost:3001`).

###### NOTE
* Please obtain an api key to be saved to your local .env file as "REACT_APP_MAP_TOKEN" from [mapbox.com](https://www.mapbox.com/). If you wish to use a different name please change it accordingly in the Map.js component.
  - You will need to sign up for an account in order to obtain an api key.
  - Make sure to check the [pricing](https://www.mapbox.com/pricing/) as mapbox allows 50,000 free map views a month to start and will start charging once your account has exceeded it.
  - API documentation can be found here [mapboxgl api](https://docs.mapbox.com/mapbox-gl-js/api/).
* The URLs paths saved in the local .env file were for convenience. Please update the base url if you're using a different port for the Rails back end server.
  - REACT_APP_LOGIN_URL=http://localhost:3000/api/v1/login
  - REACT_APP_USER_URL=http://localhost:3000/api/v1/users
  - REACT_APP_USER_PROFILE_URL=http://localhost:3000/api/v1/profile
  - REACT_APP_FACILITIES_URL=http://localhost:3000/api/v1/facilities
  - REACT_APP_STATES_URL=http://localhost:3000/api/v1/states
  - REACT_APP_RESERVATION_URL=http://localhost:3000/api/v1/reservations

## Built With
* [dotenv](https://github.com/motdotla/dotenv)
* [React.js](https://reactjs.org/)
* [Create React App](https://github.com/facebook/create-react-app)
  - [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
* [Semantic UI React](https://react.semantic-ui.com/)
* [Mapbox GL JS API](https://docs.mapbox.com/mapbox-gl-js/api/)
* [React datepicker](https://github.com/Hacker0x01/react-datepicker)
