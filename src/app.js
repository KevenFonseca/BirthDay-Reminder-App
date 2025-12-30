const express = require('express')
const userRoute = require('./routes/userRoute')
const startBirthdayCron = require('./jobs/birthdayCron')

const app = express()

// cron jobs
startBirthdayCron()

// middlewares
app.use(express.json())
app.use(express.static('./public'))

// routes
app.use('/user', userRoute)

module.exports = app