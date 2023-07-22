// make express available so we can setup Router
const express = require('express')

const {
    getAllComplaints,
    updateComplaint,
    createComplaint
} = require('.../controllers/complaintController')    // Import meetingController 
                                                    // which contains all functions
                                                    // needed for handlers

// Create instance of router so we can make routes for complaints
const router = express.Router()

// Create handlers. All of these have relative paths.
// The path is the first argument to the method.
// The paths are relative to the path specified
// in the first arg to the corresponding app.use
// inside our server.js

// Admin Only Handlers:
// Get all complaints
router.get('/', getAllComplaints)

// Respond to one complaint
router.patch('/:id', updateComplaint)

// Admin and Client Handlers:
// Create single complaint
router.post('/', createComplaint)

// export the routes so we can import them
// into our main app
module.exports = router