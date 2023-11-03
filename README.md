# About the app

Main web app contains multiple light weight apps with different functionality as described in following table:
|Name of the app|Description|Requires running backend server|
|---|---|---|
|Reaction time test|Measuring reaction time of the user, based on the click on the button|No|
|Lorem ipsum generator|Generating Lorem Ipsum text with desired length and other properties|No|
|Favorite symbols|Database of emojis and other symbols with search function. User is able to save favorite emojis to cookies for later quick access.|No|
|API tester|Testing REST API requests. User is able to input request method, headers, body and view the properties of response to this request.|Yes|

# How to run the app

## Install dependencies

- npm
- nodejs
- App specific node modules, use `npm install` in project directory

## Run backend script

Use command `node backend/server.js`

## Running the app on localhost

- `npm start`

## Deployment of the app on public server

- In following files, you may need to modify port numbers, paths and BrowserRouter basename:
  - backend/server.js
  - backend/api/api.js
  - src/index.js
  - src/components/apps/api-tester/ApiTester.js  

- Build the app with `npm run build`

- Serve the app with `serve -s build` or use other serving tool
