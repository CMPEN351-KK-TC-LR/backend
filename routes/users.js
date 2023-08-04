// make express available so we can setup Router
const express = require('express')

const User = require('../models/UserModel')

const {
    createAdmin,
    createClient,
    updateProfile,
    validateUser,
    loginUser,
    validateLogin
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

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!(email && password)) {
            res.status(400).send('Invalid credentials')
        }

        await loginUser(req, res)
    } catch (e) {
        console.error(e)
    }
})

// Used to re-authenticate a logged on user
router.post('/auth', async (req, res) => {
    try {
        const { _id, password } = req.body
        if (!(_id && password)) {
            res.status(400).send('Invalid credentials')
        }

        // After verifying that info was submitted
        const { error } = validateLogin(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        await loginUser(req, res)
    } catch (e) {
        console.error(e)
    }
})

// Get user information
router.get('/user-info', auth, async (req, res) => {
    const user = await User.findById(req.user.user_id).select('-password')
    res.json(user)
})

router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from database
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update profile information
router.patch('/update/:id', updateProfile)

// export the routes so we can import them
// into our main app
module.exports = router