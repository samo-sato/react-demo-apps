// Import React environment variables from `.env` file
require('dotenv').config();

// For working with file and directory paths
const path = require('path');

// REST API functionality
const { app } = require(path.resolve(__dirname, 'api', 'api'));

// Starting http server
const port = process.env.BACKEND_PORT;
app.listen(port, () => {
  console.log(`API server is listening on port ${port}`);
});