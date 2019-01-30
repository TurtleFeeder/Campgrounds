# Campgrounds 🏕
A campgrounds search and reservation/trip tracking tool for campgrounds within the United States. A user can search for campgrounds within the United States by state. The user can search without logging in but is required to log in to log/make reservations for campgrounds and to access the profile which contains the user's reservations/trips. The back-end is Ruby on Rails and the front-end uses React.js.

Link to [Demo Video](https://youtu.be/W-MtbtqQpCY)

## Setup Instruction
This repository contains the front and back end in separate folders.

**Back End**
1. Change directory into campgrounds_backend.
2. Install all required gems using `bundle install`.
3. Setup a new PostgreSQL development database using `rails db:create`.
4. Run database migrations and establish scheme using `rails db:migrate`.
5. Use `rails s` to start the server on default port 3000. If you wish to use a different port please update the fetch calls in the front-end accordingly.
6. `ctrl + c` will stop the server.

###### NOTE
* Please obtain an api key to be saved in your local .env file from https://ridb.recreation.gov/docs#/.
  - This is the public api that this back-end server pulls and parses data from.
  - You will need to sign up for an account in order to obtain an api key.
* Please create your own 'TOKEN_SECRET' password and save it into your local .env file for the ENV['TOKEN_SECRET'] used for JWT authentication in the application_controller.rb.

**Front End**
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

## Acknowledgement
* Campgrounds data provided for free by [recreation.gov](https://ridb.recreation.gov/docs#/).
* Map component used [mapbox gl](https://docs.mapbox.com/mapbox-gl-js/api/).
* Default image camera icon made by [Freepik](https://www.freepik.com/) from [www.flaticon.com](https://www.flaticon.com/).
* Forest background image found on Google and [blogspot.com](https://newmobilephonephotos.blogspot.com/2018/07/green-tree-hd-background-pictures.html).
* Campground tent icon made by [freeiconspng.com](https://www.freeiconspng.com/img/13522).
