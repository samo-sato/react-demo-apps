# React Demo Apps

Main web app contains multiple light-weight apps with different functionality as described in following table:
|Name of the app|Description|Requires Running Backend Server|
|---|---|---|
|Reaction time test|Measuring reaction time of the user, based on the click on the button|No|
|Lorem ipsum generator|Generating Lorem Ipsum text with desired length and other properties|No|
|Favorite symbols|Database of emojis and other symbols with search function. User is able to save favorite emojis to cookies for later quick access.|No|
|API tester|Testing REST API requests. User is able to input request method, headers, body and view the properties of response to this request.|Yes|

# Run the App

**Note:** *This README file assumes that the app will be run on Linux operating system*

## Install Dependencies

- npm (tested on v9.6.3)
- nodejs (tested on v16.16)
- App specific node modules, use command `npm install` in project directory

## Set Environment Variables

### OS Server Specific Environment Variables

Set the variables as described in following table:

|Variable Name|Default Value|Description|
|---|---|---|
|`RDA_BACKEND_PORT`|3001|REST API server will be listening on this port number|
|`RDA_BASE_PATH`|*empty string*|Base path (sub-directory) with leading forward slash (e.g. `/react-demo-apps`) or just empty string `` when running under root URL|

Depending on Linux distribution, environment variables may be set in one of the following files:

- `~/.bashrc`
- `~/.bash_profile`
- `~/.profile`
- `/etc/environment`
- `/etc/profile`
- `~/.zshrc`

Example of setting up OS specific environment variable `MY_VAR` with value of `Hello, world` on Linux Mint 20 in `/etc/environment` file:

1. At the end of the file add following line: `MY_VAR="Hello, world"`
2. Save the file
3. Run command `source /etc/environment` to apply the changes
4. Test the variable by running command `echo $MY_VAR` in Linux terminal or `process.env.MY_VAR` in nodejs `node` console

### React Specific Environment Variables

Following variables are stored in `.env.example` file in project directory. **Set variables into `.env` file instead.**

|Variable Name|Default value|Description|
|---|---|---|
|`REACT_APP_BACKEND_PORT`|3001|Frontend will make requests to this port number. Leave empty string if no port is required in resource URL.|
|`REACT_APP_BASE_PATH`|*empty string*|Value should be equal to `RDA_BASE_PATH` variable|

**Do not** store sensitive data in `.env` file, as it could be accessed by anyone.

## Modify package.json File (Optional)

If running app under sub-directory (e.g. `http://www.example.org/react-demo-apps`), then add `homepage` property to `package.json` file with value equal to `RDA_BASE_PATH` environment variable.

## Run the Backend Script

Use command `node backend/server.js` from project directory, to run backend script.

## Run the App and Deploy

- Run the app using command `npm start` or make build `npm run build`

- If using build, then serve the app with `serve -s build` or use other serving tool like *Nginx* or *Apache*

MIT License Copyright (c) 2023 https://github.com/samo-sato
