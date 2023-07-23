const mongoose = require('mongoose') // allows restricting allowed input objects
                                    // to DB
const Schema = mongoose.Schema // to create schema
const userSchema = new Schema({
    id: { // ensure each user created with unique user ID
        type: mongoose.ObjectId,
        required: true
    },
    admin: { // set this property to true for admin users
        type: Boolean,
        required: true
    },
    email: { // need to use company email to have account
        type: String,
        required: true
    },
    name: { // Display name for user
        type: String,
        required: true
    }
    // payment and password info stored elsewhere
    // use the userId to access that info
})

// Export for management use by Admins
module.exports = mongoose.model('User', userSchema)
