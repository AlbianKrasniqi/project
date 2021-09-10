const express = require('express')
const mongoose = require('mongoose')
const { json } = require('body-parser')
const FCM = require('fcm-node')


require('dotenv/config')

const app = express()

app.use(json())


// Import routes
const userRoute = require('./routes/users')
const notificationRoute = require('./routes/notifications')


app.use('/users', userRoute)
app.use('/notifications', notificationRoute)


// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, () => console.log('conetect to db')
)

// fcm end point
// app.post('/fcm', async(req, res, next) => {
//   try{
//     let fcm = new FCM(SERVER_KEY)
//     let message = {
//       to: '/deviceId/'  + req.body.deviceId,
//       notification : {
//         title : req.body.title,
//         body : req.body.body
//       }
//     }
//   } catch (error) {
//     next(error)
//   }
// })



// Routes
app.get('/', (req, res) => {
    res.send('Hello!')
})


// Listening
app.listen(4000)

