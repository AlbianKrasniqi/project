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

// Find by:Id
// router.get('/:notificationId', async (req, res) => {
//     try{
//         const post = await Notification.findById(req.params.notificationId)
//         res.json(post)
//     } catch (err) {
//         res.json({message: err})
//     }
// })


router.post('/' , (req, res) => {
    const post = new Notification({
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