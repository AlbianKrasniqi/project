const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    userId: { type: String, required:true },
    head: { type: String, required:true },
    body: { type: String, required:true },
    },
    { timestamps: true }
    )

module.exports = mongoose.model('Notifications', notificationSchema)