const userModel = require('../models/user.model')
const sendBirthdayEmail = require('./email.service')

const checkBirthdays = async () => {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    
    const users = await userModel.find({
        $expr: {
            $and: [
                { $eq: [{$dayOfMonth: '$dateOfBirth'}, day]},
                { $eq: [{$month: '$dateOfBirth'}, month]}
            ]
        }
    })
    
    console.log(users)
    
    for (user of users) {
        await sendBirthdayEmail(user.userName, user.email)
    }
    
}

module.exports = checkBirthdays