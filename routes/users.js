// make express available so we can setup Router
const express = require('express')

const User = require('../models/UserModel')

const {
    createAdmin,
    createClient,
    updateProfile,
    validateUser
} = require('../controllers/userController')// Import userController 
                                            // which contains all functions
                                            // needed for handlers

const auth = require('../controllers/auth') // Middleware function for verifying auth

// Create instance of router so we can make routes for users
const router = express.Router()

// Create handlers. All of these have relative paths.
// The path is the first argument to the method.
// The paths are relative to the path specified
// in the first arg to the corresponding app.use
// inside our server.js
//
// Register new user.
router.post('/register', async (req, res) => {
    // Validate request body
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Check if user is already in database
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User already created.")

    // Determine which type of request is being made
    if (req.body.requesterIsAdmin) { // Admins only create other admins
        createAdmin(req, res)
    } else { // Otherwise a regular user requested an account
        createClient(req, res)
    }
})

// Get user information
router.get('/user-info', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})

// Update profile information
router.patch('/update/:id', updateProfile)

// export the routes so we can import them
// into our main app
module.exports = router