# Birthday Reminder App

A simple Node.js application that automatically sends birthday emails to customers. Users enter their name, date of birth, and email through a web form. Every day at 7:00 AM, the app checks the database for birthdays and sends a personalized birthday message by email automatically.

## Features

- 📝 **User Registration**: Simple form to register users with name, email, and date of birth
- 🕖 **Automated Scheduling**: Runs daily at 7:00 AM to check for birthdays
- 📧 **Email Notifications**: Automatically sends HTML-formatted birthday emails
- 🗄️ **MongoDB Integration**: Stores user information persistently
- ✅ **Input Validation**: Joi schema validation for data integrity
- 🔐 **Secure Email**: Uses Gmail App Passwords for secure authentication
- 🌍 **Timezone Support**: Configurable timezone for cron job execution

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Email**: Nodemailer with Gmail SMTP
- **Scheduling**: node-cron
- **Validation**: Joi
- **Frontend**: HTML5, JavaScript, CSS3

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB account (local or MongoDB Atlas)
- Gmail account with App Password enabled

### Setup Steps

1. **Clone or download the project**
   ```bash
   cd Birthday-Reminder-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   - Copy `.env.example` to `.env`
   - Fill in your configuration values

4. **Configure Environment Variables**

   ```env
   PORT=3000
   MONGO_DB_URL=your_mongodb_connection_string
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-digit-app-password
   TZ=Atlantic/Cape_Verde
   ```

### Gmail Setup (App Password)

1. Enable 2-Step Verification on your Google Account
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password
   - Copy this to `GMAIL_APP_PASSWORD` in `.env`

### MongoDB Setup

**Using MongoDB Atlas (Cloud):**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and database
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/birthdaydb`
4. Add to `.env` as `MONGO_DB_URL`

**Using Local MongoDB:**
```env
MONGO_DB_URL=mongodb://localhost:27017/birthdaydb
```

## Running the App

### Development mode (with auto-reload)
```bash
npm run dev
```

### Production mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`)

## API Endpoints

### POST `/user`
Register a new user

**Request body:**
```json
{
  "userName": "João Silva",
  "email": "joao@example.com",
  "dateOfBirth": "1990-05-15"
}
```

**Response (201):**
```json
{
  "success": true
}
```

**Response (400/409/500):**
```json
{
  "error": "Error message"
}
```

### GET `/user`
Retrieve all registered users

**Response (200):**
```json
{
  "data": [
    {
      "_id": "...",
      "userName": "João Silva",
      "email": "joao@example.com",
      "dateOfBirth": "1990-05-15T00:00:00.000Z",
      "createdAt": "2025-12-30T10:30:00.000Z",
      "updatedAt": "2025-12-30T10:30:00.000Z"
    }
  ]
}
```

## Project Structure

```
Birthday-Reminder-App/
├── public/                 # Frontend static files
│   ├── index.html         # Main HTML page
│   ├── script.js          # Client-side JavaScript
│   └── style.css          # Styling
├── src/
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/
│   │   └── userController.js  # User creation & retrieval logic
│   ├── jobs/
│   │   └── birthdayCron.js    # Daily cron job scheduler
│   ├── middlewares/
│   │   └── validate.js         # Joi validation middleware
│   ├── models/
│   │   └── userModel.js        # User schema definition
│   ├── routes/
│   │   └── userRoute.js        # User routes
│   ├── services/
│   │   ├── birthdayService.js  # Birthday checking logic
│   │   ├── sendBirthdayEmail.js # Email sending logic
│   │   └── transporter.js      # Nodemailer configuration
│   ├── validators/
│   │   └── userSchema.js       # Joi validation schemas
│   ├── app.js             # Express app setup
│   └── server.js          # Server entry point
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## How It Works

1. **User Registration**: User fills the form on the homepage and submits data to `/user` endpoint
2. **Data Validation**: Input is validated using Joi schema (name, email, date of birth)
3. **Database Storage**: Valid data is stored in MongoDB
4. **Daily Check**: At 7:00 AM every day, the cron job runs `checkBirthdays()`
5. **Birthday Detection**: Compares today's date (day & month) with all users' dates of birth
6. **Email Sending**: For matching birthdays, sends personalized HTML email via Gmail
7. **Logging**: All actions are logged to console for monitoring

## Validation Rules

### User Name
- Minimum 2 characters, maximum 50 characters
- Only letters and spaces allowed
- Required field

### Email
- Must be valid email format
- Must be unique (no duplicates in database)
- Required field

### Date of Birth
- Must be a valid date
- Must be in the past (cannot be today or future date)
- Required field

## Cron Job Details

- **Schedule**: `0 7 * * *` (7:00 AM every day)
- **Timezone**: Configurable via `TZ` environment variable (defaults to UTC)
- **Common Timezones**:
  - `Europe/Lisbon`
  - `Europe/London`
  - `America/New_York`
  - `Asia/Tokyo`
  - `Atlantic/Cape_Verde`

## Troubleshooting

### "MONGO_DB_URL not defined in the .env file"
- Ensure `.env` file exists in project root
- Check that `MONGO_DB_URL` is correctly set
- Verify MongoDB connection string format

### "Email transporter verification failed"
- Check `GMAIL_USER` and `GMAIL_APP_PASSWORD` are correct
- Ensure 2-Step Verification is enabled on Gmail account
- Verify App Password is the 16-digit one (not regular password)
- Check "Less secure app access" is not blocking (if using regular password)

### Emails not being sent at scheduled time
- Verify server timezone matches `TZ` in `.env`
- Check server system clock is correct
- Review console logs for any cron errors
- Test with manual database query to confirm birthday match

### CORS errors on frontend
- Ensure `CORS` middleware is enabled in `app.js`
- If running frontend on different domain, add to CORS allowlist

## Development Notes

- Currently uses Gmail SMTP for email sending (free option)
- For production, consider transactional email services (SendGrid, Mailgun, etc.)
- App uses email validation regex but relies on Gmail delivery for actual confirmation
- No authentication/authorization implemented - consider adding for production

## Future Enhancements

- [ ] User authentication and dashboard
- [ ] Birthday email templates customization
- [ ] User timezone preferences
- [ ] Email frequency options (daily, weekly, etc.)
- [ ] Notification preferences (email/SMS)
- [ ] Admin dashboard for monitoring
- [ ] Unit and integration tests

## License

ISC

## Support

For issues or questions, please check the troubleshooting section or review console logs for detailed error messages.