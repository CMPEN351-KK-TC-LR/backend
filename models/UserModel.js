const mongoose = require('mongoose') // allows restricting allowed input objects
                                    // to DB
const jwt = require('jsonwebtoken')
const config = require('config')
const Schema = mongoose.Schema // to create schema

// User model object in database
const userSchema = new Schema({
    admin: { // set this property to true for admin users
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

// Generate and return a signed JSON web token.
// Signed using the secret private key of this webserver
userSchema.methods.genAuthToken = () => {
    const token = jwt.sign({_id: this._id, isAdmin: this.admin}, config.get('secretprivatekey'))
    return token
}

// Export for management use by Admins
module.exports = mongoose.model('User', userSchema)
