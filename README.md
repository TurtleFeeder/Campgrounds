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
1. Change directory into campgrounds-frontend.

## Acknowledgement
* Data provided for free by [recreation.gov](https://ridb.recreation.gov/docs#/).
* Default image camera icon made by [Freepik](https://www.freepik.com/) from [www.flaticon.com](https://www.flaticon.com/).
* Forest background image found on Google and [blogspot.com](https://newmobilephonephotos.blogspot.com/2018/07/green-tree-hd-background-pictures.html).
* Campground tent icon made by [freeiconspng.com](https://www.freeiconspng.com/img/13522).
