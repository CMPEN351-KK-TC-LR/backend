// make express available so we can setup Router
const express = require('express')
const Meeting = require('../models/MeetingModel') // Import meeting model
                                                  // so we can work with DB
                                                  // using Model

// Create instance of router so we can make routes for meetings
const router = express.Router()

// Create handlers. All of these have relative paths.
// The path is the first argument to the method.
// The paths are relative to the path specified
// in the first arg to the corresponding app.use
// inside our server.js
//
// Admin Only Functions
// Get all meetings
router.get('/', (req, res) => {
    res.json({msg: 'GET all meetings'})
})

// User Functions (and Admin)
// Get meetings of only single user
router.get('/users/:userId', (req, res) => {
    res.json({msg: 'GET all meetings by userId'})
})

// Get single meeting
router.get('/:id', (req, res) => {
    res.json({msg: 'GET single meeting'})
})

// Create single meeting
router.post('/', (req, res) => {
    res.json({msg: 'POST a new meeting'})
})

// Update single meeting
router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE a meeting'})
})

// Delete a single meeting
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE a single meeting'})
})

// export the routes so we can import them
// into our main app
module.exports = router