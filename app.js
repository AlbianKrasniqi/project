const express = require('express')
const mongoose = require('mongoose')
const { json } = require('body-parser')
require('dotenv/config')

const app = express()

app.use(json())


// Import routes
const userRoute = require('./routes/users')

app.use('/users', userRoute)


// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, () => console.log('conetect to db')
)


// Routes
app.get('/', (req, res) => {
    res.send('Hello!')
})


// Listening
app.listen(4000)