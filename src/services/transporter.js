const nodemailer = require('nodemailer')
require('dotenv').config()

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("GMAIL_USER and GMAIL_APP_PASSWORD are required in .env file")
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
})

const verifyEmailTransporter = async () => {
    try {
        await transporter.verify()
        console.log("Email transporter is ready")
    } catch (err) {
        console.error("Error verifying email transporter:", err.message)
        process.exit(1)
    }
}

module.exports = { 
    transporter, 
    verifyEmailTransporter 
}