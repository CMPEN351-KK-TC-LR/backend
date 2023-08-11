// make express available so we can setup Router
const express = require('express')

const {
    getAllMeetings,
    getTimeMeetings,
    getUserMeetings,
    getMeeting,
    createMeeting,
    updateMeeting,
    deleteMeeting
} = require('../controllers/meetingController') // Import meetingController 
                                                 // which contains all functions
                                                 // needed for handlers

// Create instance of router so we can make routes for meetings
const router = express.Router()

const auth = require('../controllers/auth')

// Create handlers. All of these have relative paths.
// The path is the first argument to the method.
// The paths are relative to the path specified
// in the first arg to the corresponding app.use
// inside our server.js
//
// Admin Only Handlers:
// Get all meetings
router.post('/get-meetings', auth, async (req, res) => {
    try {
        await getAllMeetings(req, res)
    } catch (e) {
        console.error(e)
    }
})

// Get meetings for a single time slot
router.post('/get-meetings-timeslot', auth, async (req, res) => {
    try {
        await getTimeMeetings(req, res)
    } catch (e) {
        console.error(e)
    }
})

// Admin and Client Handlers
// Get meetings of only single user
router.post('/get-meetings-user', auth, async (req, res) => {
    try {
        await getUserMeetings(req, res)
    } catch (e) {
        console.error(e)
    }
})

// Get single meeting by name
router.post('/get-meeting-name', auth, async (req, res) => {
    try {
        await getMeeting(req, res)
    } catch (e) {
        console.error(e)
    }
})

// Create single meeting
router.post('/create-meeting', auth, async (req, res) => {
    try {
        await createMeeting(req, res)
    } catch (e) {
        console.error(e)
    }
})

// Update single meeting
router.patch('/update-meeting', auth, async (req, res) => {
    try {
        await updateMeeting(req, res)
    } catch (e) {
        console.error(e)
    }
})

// Delete a single meeting
router.delete('/delete-meeting', auth, async (req, res) => {
    try {
        await deleteMeeting(req, res)
    } catch (e) {
        console.error(e)
    }
})

// export the routes so we can import them
// into our main app
module.exports = router
