// Import React environment variables from `.env` file
require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path') // for working with file and directory paths
const nodeFetch = require('node-fetch') // for making http requests
const bodyParser = require('body-parser')

// cors middleware
const cors = require('cors')
app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.text()) // for receiving plain text data in the body

// using "express router" in order to always use "api" path at begining of endpoint url
const router = express.Router()
const basePath = process.env.REACT_APP_BASE_PATH
app.use(`${basePath}/api`, router)

router.get('/', (req, res) => {
  res.send('API server')
})

// checking for too many requests in given time period
let requests = []
function tooManyRequests(ip, host) {

  const maxAllowedRequests = 5 // amount of requests to be allowed in given "timeWIndow"
  const timeWIndow = 10 * 1000 // duration of "timeWIndow" in milli-seconds

  // logging data about current request attempt
  requests.push({
    timestamp: getTimestamp(), // timestamp of request attempt in milli-seconds (unix time)
    ip: ip, // IP addrest of user who try to make request
    host: host // hostname of requested endpoint
  })

  // remove old logs from storage
  const filteredArray = requests.filter((log) => getTimestamp() - timeWIndow < log.timestamp )
  requests = filteredArray // overwriting old logs with filtered logs

  // counting request attempts
  let i = 0 // counting request attempts from same IP
  let j = 0 // counting request attempts to same host
  requests.forEach((log) => {
    i = log.ip === ip && i + 1
    j = log.host === host && j + 1
  })

  // determining if too many request attempts were made
  if (i >= maxAllowedRequests || j >= maxAllowedRequests) {
    return true
  } else {
    return false
  }

}

// returns current unix time timestamp in milli-seconds
function getTimestamp() {
  return Date.now()
}

// validate user input data
function validate(data, userIP) {

  console.log('Validating input data')

  const errors = []
  const validated = {}

  // checking for too many request attempts
  if (tooManyRequests(userIP, data.inputUrl)) {
    errors.push('Too many request, please try again later')
  }

  // validating URL
  try {
    const urlParse = new URL(data.inputUrl) // parsing URL from user input
    validated.inputProtocol = urlParse.protocol
    validated.inputSecure = validated.inputProtocol === 'https:' ? true : false
    if (validated.inputProtocol !== 'http:' && validated.inputProtocol !== 'https:') {
      errors.push('Missing "http" or "https"')
    }
    validated.inputHostname = urlParse.hostname
    if (validated.inputHostname.length === 0) {
      errors.push('Hostname missing')
    }
    validated.inputPathname = urlParse.pathname
    validated.inputPort = urlParse.port
    validated.inputSearch = urlParse.search

    // validating http method
    validated.inputMethod = data.inputMethod
    if (
        data.inputMethod !== 'GET' &&
        data.inputMethod !== 'POST' &&
        data.inputMethod !== 'PUT' &&
        data.inputMethod !== 'DELETE'
      ) {
      errors.push('Invalid method')
    }
  } catch (error) {
    console.log(error)
    errors.push('Invalid URL ?')
  }

  // validating if given headers is valid JSON string
  try {
    console.log(data.inputHeaders)
    validated.inputHeaders = data.inputHeaders ? JSON.parse(data.inputHeaders) : {}
  } catch (error) {
    console.log(error)
    errors.push('Invalid headers - must be JSON')
  }

  // validating if body is empty when method GET is selected
  if (data.inputMethod === 'GET' && data.inputBody !== '') {
    errors.push('GET request can not contain body')
  }

  // adding users inputed body to data
  validated.inputBody = data.inputBody

  return {
    data: errors.length === 0 ? validated : null,
    errors: errors
  }
}

router.get('/test', async (req, res) => {
  // res.status(200).send('Ok') // text response
  res.status(200).send('ok')
})

router.post('/make-request', async (req, res) => {

  console.log('Request received')

  const validation = validate(req.body, req.ip)
  if (validation.errors.length === 0) {
    // input data validation ok
    // console.log(validation.data)
    console.log('Validation ok')

    const port = validation.data.inputPort ? `:${validation.data.inputPort}` : '' // if user inputs non-standard port number
    const method = validation.data.inputMethod
    const url = `${validation.data.inputProtocol}//${validation.data.inputHostname}${port}${validation.data.inputPathname}${validation.data.inputSearch}`
    const requestHeaders = validation.data.inputHeaders
    const requestBody = validation.data.inputBody === '' ? null : validation.data.inputBody

    // making actual request to user given url using node-fetch
    nodeFetch(url, {
      method: method,
      headers: requestHeaders,
      body: requestBody
    })
      .then((response) => {

        // converting response headers to JSON string
        const responseHeaders = {}
        for (const [key, value] of response.headers.entries()) {
          responseHeaders[key] = value
        }
        const jsonResponseHeaders = JSON.stringify(responseHeaders)

        return {
          statusCode: response.status,
          statusText: response.statusText,
          responseHeaders: jsonResponseHeaders,
          responseBody: response.text()
        }

      })
      .then((data) => {
        // resolve the responseBody promise and include it in the object
        return data.responseBody
          .then((bodyText) => {
            data.responseBody = bodyText
            return data
          })
      })
      .then((finalData) => { // resolved responseBody in the finalData object
          // console.log(finalData)
          res.status(200).send({
              success: true,
              data: finalData
            })
        })
      .catch((error) => {
        console.error(error)
        res.status(500).send({
          success: false,
          errors: ['node-fetch error']
        })
      })

  } else {
    // input data validation not ok
    console.log('Validation NOT ok')
    res.status(400).send({
        success: false,
        errors: validation.errors
      })
  }

})

module.exports = { app }
