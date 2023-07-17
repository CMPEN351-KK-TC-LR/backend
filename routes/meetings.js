// make express available so we can setup Router
const express = require('express')
const Meeting = require('../models/MeetingModel') // Import meeting model
                                                  // so we can work with DB
                                                  // using Model
const {
    getAllMeetings,
    getUserMeetings,
    getMeeting,
    createMeeting,
    updateMeeting,
    deleteMeeting
} = require('.../controllers/meetingController') // Import meetingController 
                                                 // which contains all functions
                                                 // needed for handlers

// Create instance of router so we can make routes for meetings
const router = express.Router()

// Create handlers. All of these have relative paths.
// The path is the first argument to the method.
// The paths are relative to the path specified
// in the first arg to the corresponding app.use
// inside our server.js
//
// Admin Only Handlers:
// Get all meetings
router.get('/', getAllMeetings)

// Admin and User Handlers
// Get meetings of only single user
router.get('/users/:userId', getUserMeetings)

// Get single meeting
router.get('/:id', getMeeting)

// Create single meeting
router.post('/', createMeeting)

// Update single meeting
router.patch('/:id', updateMeeting)

// Delete a single meeting
router.delete('/:id', deleteMeeting)

// export the routes so we can import them
// into our main app
module.exports = router
