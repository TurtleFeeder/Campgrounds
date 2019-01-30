# Campgrounds Back End
 Ruby Version: ruby 2.3.3p222

## Setup Instruction

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
