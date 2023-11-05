// for working with file and directory paths
const path = require('path')

// REST API functionality
const { app } = require(path.resolve(__dirname, 'api', 'api'))

// starting http server
const port = process.env.RDA_BACKEND_PORT
app.listen(port, () => {
  console.log(`API server is listening on port ${port}`)
})
