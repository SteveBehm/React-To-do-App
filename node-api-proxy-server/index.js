const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 3000

const app = express()

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,   // 10 mins
  max: 100                    // 100 requests
})
app.use(limiter)
app.set('trust proxy', 1)

// set static folder -- improves security of our files
app.use(express.static('public'))

// Routes
app.use('/api', require('./routes/index'))

//Enable cors
app.use(cors())

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
