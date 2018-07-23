# Galois Capital Coding Challenge

## Setting up

* Clone this repository
* `cd Galois_Capital_Challenge` - enter the repository
* run `npm install` in the root of the repository
* `cd frontend/` - enter the frontend directory
* run `npm install` again within the frontend directory
* `cd ..` togo back to the root of the reposity
* run `curl -X POST "grant_type=password&username=<username>&password=<password> -u "<client_token>" <url>/mfa/oauth2/token/` to get an access token
* copy the access token and go to server.js
* on line 8, replace `<INSERT ACCESS TOKEN HERE>` with the access token you received
* simply run `yarn dev` and now go to `localhost:3000`!
