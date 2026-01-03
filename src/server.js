const app = require('./app')
const connectDB = require('./config/db.js')
require('dotenv').config()

const PORT = process.env.PORT || 3000

// Connect to the Database
connectDB()

app.listen(PORT, () => {
  console.log('Server running')
})
