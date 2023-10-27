const path = require('path')

// REST API functionality
const { app } = require(path.resolve(__dirname, 'api', 'api'))

// starting http server
const port = 3001
app.listen(port, () => {
  console.log(`API server is listening on port ${port}`)
})
