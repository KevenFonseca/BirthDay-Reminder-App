const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_DB_URL = process.env.MONGO_DB_URL

if (!MONGO_DB_URL) {
    throw new Error('MONGO_DB_URL not define in the .env file')
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URL)
        console.log('MongoDB Connected')
        
    } catch (err) {
        console.log('Error connecting to MongoDB', err.message)
        process.exit(1)
    }
}

module.exports = connectDB