const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    userName: {
        type: String,
        pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format']
    },
    dateOfBirth: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)