const express = require('express')
const cors = require('cors')
const path = require('path')
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
app.use(express.static(path.join(__dirname, '..', 'public')))

// routes
app.use('/user', userRoute)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app