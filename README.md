# About the app

Main web app contains multiple light weight apps with different functionality as described in following table:
|Name of the app|Description|Requires running backend server|
|---|---|---|
|Reaction time test|Measuring reaction time of the user, based on his click on the button|No|
|Lorem ipsum generator|Generating Lorem Ipsum text with desired length and other properties|No|
|Favorite symbols|Database of emojis and other symbols with search function. User is able to save favorite emojis to cookies for later quick access.|No|
|API tester|Testing REST API requests. User is able to input request method, headers, body and see the properties of response to this request.|Yes|

# How to run the app

## Install dependencies
`npm install`
And all other needed dependencies.

## Run backend script

Use command `node backend/server.js`

## Use one of the following commands depending on your needs

- `npm start`
- `npm test`
- `npm run build`

## Serve the app

For example by using "serve" tool:
`serve -s build`
