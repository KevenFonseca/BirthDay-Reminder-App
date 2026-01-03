const cron = require('node-cron')
const checkBirthdays = require('../services/birthdayService')
require('dotenv').config()

const startBirthdayCron = () => {
    cron.schedule(
        '0 7 * * *', 
        async () => {
            console.log('Checking birthdays')
            await checkBirthdays()
        },
        {
            timezone: process.env.TZ || 'UTC'
        }
    )
}

module.exports = startBirthdayCron 