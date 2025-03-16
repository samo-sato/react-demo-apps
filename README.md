# React Demo Apps

Main web app contains multiple light-weight apps with different functionality as described in following table:
|Name of the app|Description|Requires Running Backend Server|
|---|---|---|
|Reaction time test|Measuring reaction time of the user, based on the click on the button|No|
|Lorem ipsum generator|Generating Lorem Ipsum text with desired length and other properties|No|
|Favorite symbols|Database of emojis and other symbols with search function. User is able to save favorite emojis to cookies for later quick access.|No|
|API tester|Testing REST API requests. User is able to input request method, headers, body and view the properties of response to this request.|Yes|

# Run the App

## Install Dependencies

- npm (tested on v9.6.3)
- nodejs (tested on v16.16)
- App specific node modules, use command `npm install` in project directory

## Set Environment Variables

Copy `.env.example` file and rename it to `.env`.
Update the values inside `.env` as needed.

## Modify package.json File (Optional)

If running app under sub-directory (e.g. `http://www.example.org/react-demo-apps`), then add `homepage` property to `package.json` file with value equal to `RDA_BASE_PATH` environment variable.

## Run the Backend Script

Use command `node backend/server.js` from project directory, to run backend script.

## Run the App and Deploy

- Run the app using command `npm start` or make build `npm run build`

- If using build, then serve the app with `serve -s build` or use other serving tool like *Nginx* or *Apache*

MIT License Copyright (c) 2025 https://github.com/samo-sato
