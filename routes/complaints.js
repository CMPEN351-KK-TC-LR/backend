// make express available so we can setup Router
const express = require('express')

const Complaint = require('../models/ComplaintModel')

const {
    getAllComplaints,
    updateComplaint,
    createComplaint
} = require('../controllers/complaintController')    // Import meetingController
                                                    // which contains all functions
                                                    // needed for handlers

const auth = require('../controllers/auth');

// Create instance of router so we can make routes for complaints
const router = express.Router()

// Create handlers. All of these have relative paths.
// The path is the first argument to the method.
// The paths are relative to the path specified
// in the first arg to the corresponding app.use
// inside our server.js

// Admin Only Handlers:
// Get all complaints
router.get('/get-all-complaints', auth, async (req, res) => {
    try {
        await getAllComplaints(req, res);
    } catch (e) {
        console.error(e);
    }
});

// Respond to one complaint
router.patch('/update-complaint', auth, async (req, res) => {
    try {
        await updateComplaint(req, res);
    } catch (e) {
        console.error(e);
    }
});

// Admin and Client Handlers:
// Create single complaint
router.post('/create-complaint', auth, async (req, res) => {
    try {
        await createComplaint(req, res);
    } catch (e) {
        console.error(e);
    }
});

// export the routes so we can import them
// into our main app
module.exports = router