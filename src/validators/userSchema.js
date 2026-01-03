const joi = require('joi')

const userSchema = joi.object({
    userName: joi.string()
        .trim()
        .min(2)
        .max(50)
        .pattern(new RegExp('^[a-zA-ZÀ-ÿ]+([\' -][a-zA-ZÀ-ÿ]+)*$'))
        .required(),
        
    email: joi.string()
        .email()
        .required(),
        
    dateOfBirth: joi.date()
        .max('now')
        .required()
})
    
module.exports = userSchema