const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const startBirthdayCron = require('./jobs/birthdayCron')
const { verifyEmailTransporter } = require('./services/transporter')

const app = express()

// cron jobs
const startAppJobs = async () => {
    await verifyEmailTransporter()
    startBirthdayCron()
}

startAppJobs()

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.static('./public'))

// routes
app.use('/user', userRoute)

module.exports = app