const mongoose = require('mongoose') // allows restricting allowed input objects
                                    // to DB

const Schema = mongoose.Schema // to create schema

// User model object in database
const userSchema = new Schema({
    isAdmin: { // set this property to true for admin users
        type: Boolean,
        required: true
    },
    email: { // need to use company email to have account
        type: String,
        minlength: 21,
        maxlength: 50,
        unique: true,
        required: true
    },
    name: { // Display name for user
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 15,
        maxlength: 255
    }
})

// Export for management use by Admins
module.exports = mongoose.model('User', userSchema)
