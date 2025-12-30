const joi = require('joi')

const userSchema = joi.object({
    userName: joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
        
    email: joi.string()
        .email()
        .required(),
        
    dateOfBirth: joi.date()
        .min('1930-01-01')
        .max('2010-12-31')
        .required()
})
    
module.exports = userSchema