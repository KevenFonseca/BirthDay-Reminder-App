const nodemailer = require('nodemailer')
require('dotenv').config()

// nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
})

const sendBirthdayEmail = async (name, email) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Happy Birthday!',
        // text: `Dear ${name},\n\nWishing you a very happy birthday! May this new year bring you joy, success, and all the happiness you deserve.\n\nBest regards,\nYour Birthday Reminder App`,
        html: `<p>Dear ${name},</p><p>Wishing you a very <b>happy birthday</b>! 🎉</p><p>Best regards,<br>Your Birthday Reminder App</p>`
    }

    try {
        await transporter.sendMail(mailOptions)
        console.log(`Birthday email sent to ${name} at ${email}`)
    } catch (err) {
        console.error(`Error sending email to ${name} at ${email}:`, err.message)
    }
}

module.exports = sendBirthdayEmail