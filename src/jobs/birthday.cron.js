const cron = require('node-cron')
const checkBirthdays = require('../services/birthday.service')

const startBirthdayCron = () => {
    cron.schedule('* * * * *', async () => {
        console.log('Checking birthdays')
        await checkBirthdays()
    })
}

module.exports = startBirthdayCron