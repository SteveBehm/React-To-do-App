const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')

// env variables
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// Initialize our cache
let cache = apicache.middleware

// cache is used as middleware in the route and it saves the request response for 2 min
// if another request is made in the 2min after the initial req, you'll get that 'temp saved' response
// when the 2 min is up and a req is made there will be an actual req made

router.get('/', cache('2 minutes'), async (req, res) => {
  try {
    // creating the params variable will allow us to use the API key in our request
    // the query method is being used to attach any params we may use in our request url
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query
    })
    // get route used to get the weather data and store the body of it in
    // the data variable
    const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
    const data = apiRes.body
    console.log(data)

    // this will log whatever is being requested to the terminal
    // full url with api key name, api key, and any params
    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`)
    }

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error})
  }

})

module.exports = router
