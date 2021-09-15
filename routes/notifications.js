const express = require('express')
const Notification = require('../models/Notification')


const router = express.Router()

// Get All
router.get('/notification', function(req, res) {
    Notification.find(function(err, data) {
        if(err){
            console.log(err)
        }
        else{
            res.send(data)
        }
    })
 })




module.exports = router
