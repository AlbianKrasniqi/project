const express = require('express')
const User = require('../models/User')

const router = express.Router()


// Get All
router.get('/', function(req, res) {
    User.find(function(err, data) {
        if(err){
            console.log(err)
        }
        else{
            res.send(data)
        }
    })
 })


// Create User
router.post('/' , (req, res) => {
    const post = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        deviceId: req.body.deviceId  
    })

    post.save()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({message : err})
        })
})


// Find by:Id
router.get('/:userId', async (req, res) => {
    try{
        const post = await User.findById(req.params.userId)
        res.json(post)
    } catch (err) {
        res.json({message: err})
    }
})


// Update User
router.patch('/:userId', async (req ,res) => {
    try{
        const _id = req.params.id
        const updatedUser = await User.updateOne(_id, req.body, {
                new : true
            }  )
            res.send(updateUser)
    } catch (err) {
        res.json({message: err})
    }    
})


// Delete User
router.delete('/:userId', async (req ,res) => {
    try{
        const removeUser = await User.remove({_id: req.params.userId})
        res.json(removeUser)
    } catch (err) {
        res.json({message: err})
    }
})



module.exports = router
