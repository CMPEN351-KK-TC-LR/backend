// make express available so we can setup Router
const express = require('express')

const {
    createAdmin,
    createClient,
    updateProfile
} = require('.../controllers/userController')// Import userController 
                                            // which contains all functions
                                            // needed for handlers

// Create instance of router so we can make routes for users
const router = express.Router()

// Create handlers. All of these have relative paths.
// The path is the first argument to the method.
// The paths are relative to the path specified
// in the first arg to the corresponding app.use
// inside our server.js
//
// Admin Only Handlers:
// Create Admin account
router.post('/', createAdmin)

// Admin and Client Handlers:
// Create Client account
router.post('/', createClient)

// Update profile information
router.patch('/:id', updateProfile)

// export the routes so we can import them
// into our main app
module.exports = router