const express = require('express')
const mongoose = require('mongoose')
const { json } = require('body-parser')
const FCM = require('fcm-node')
const Notification = require('./models/Notification')


require('dotenv/config')

const app = express()
const port = process.env.PORT || 4000

app.use(json())
app.use(express.urlencoded({extended : false}))

// Import routes
const userRoute = require('./routes/users')
const notificationRoute = require('./routes/notifications')
const User = require('./models/User')


app.use('/', userRoute)
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


app.use(express.json())


// fcm end point
app.post('/fcm', async(req, res, next) => {
    try {

        let user = await User.findById(req.body.userId);

        // return user
        if(!user) {
            return res.send('user does not exists')
        }

        let fcm = new FCM(process.env.SERVER_KEY)

        let message = {
            to : user.deviceId,
            content_available: true,
            mutable_content: true,
            notification:
            {
                title: req.body.title,
                body: req.body.body,
                sound: "default"
            }
        }
        
        const notification = new Notification({
            userId: req.body.userId,
            head: req.body.title,
            body: req.body.body

        })

        console.log("", message);

        fcm.send(message , (err, response) => {
            if(err) {
                next(err)
                console.log("Something has gone wrong!");
            }
            else {
                res.json(response)
                console.log("Successfully");
                notification.save()

            }
        })

    } catch (error) {
        next(error)
    }
})






// Routes
app.get('/', (req, res) => {
    res.send('Hello!')
})


// Listening
app.listen(port, () => {
    console.log('listening on port ', port);
})
