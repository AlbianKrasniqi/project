const express = require('express')
const Notification = require('../models/Notification')


const router = express.Router()



router.post('/notification' , (req, res) => {
    const post = new User({
        userId: req.body.userId,
        head: req.body.head,
        body: req.body.body
    })

    post.save()
        .then(data => {
            res.json(data)
            //test albian
        })
        .catch(err => {
            res.json({message : err})
        })
})


module.exports = router