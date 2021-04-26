# React Login App

V.1.1

This is a simple login app. Your goal is to improve the app doing following tasks. (Clone this repository and place in on your github)

## Tasks

- [x] 1.  Add reactstrap library and rework the login form using bootstrap styles. Don't forget about RWD and proper styling. We like good design :)

- [x] 2.  Add React Router library, move Login form to /login route (and make it default route)

- [x] 3. Replace fetch with axios library. Add /api directory and create a wrapper for axios requests. Set base API URL and Authorization header with token in the wrapper. (You can store baseAPI URL in environment variable)

- [x] 4. Add validation for the login form (with error handling from the API)

- [x] 5. Add empty /dashboard route and redirect user to the Dashboard after logging in

- [x] 6. Store User token in cookies after logging in

- [x] 7. Create public route for /login and private route for /dashboard (user should be redirected from /dashboard to /login if is not logged in)

- [x] 8. When User enters private route, get User data from API (GET /user) and store it using React Context (Authorization header is needed for this endpoint)

- [x] 9. Add Bootstrap Navbar to the Dashboard view

- [x] 10. Using React Context display User first name and last name in the Navbar

- [x] 11. Add logging out functionality (clear session). Place it in the Navbar

## Additional Tasks

- [x] Use Formik library for the login form along with Yup library for validation.
- [] (I don't have much experience in writing tests but i did add some basic tests for login form) Add unit and integration tests for logging in and logging out using built-in react-testing-library
- [x] (I put login logic in auth-context and you can get it by useAuth hook) - Separate login logic from login view using custom hook.

## Running the app

### Add base url to environment variables

In root folder create .env.local file and add there this variable REACT_APP_BASE_API_URL=<base_url>. In this case base url is port where mock server is running on.

### `npm install`

Install app dependencies.

### `npm run mock`

Runs mock API for the app.

### `npm run start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
