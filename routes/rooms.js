// make express available so we can setup Router
const express = require('express')

const {
    createRoom,
    deleteRoom,
    reserveRoom
} = require('../controllers/roomController')// Import roomController 
                                            // which contains all functions
                                            // needed for handlers

// Create instance of router so we can make routes for rooms
const router = express.Router()

const auth = require('../controllers/auth')

// Create handlers. All of these have relative paths.
// The path is the first argument to the method.
// The paths are relative to the path specified
// in the first arg to the corresponding app.use
// inside our server.js
//
// Admin Only Handlers:
// Create single room
router.post('/create-room', auth, async (req, res) => {
    try {
        await createRoom(req, res)
    } catch (e) {
        console.error(e)
    }
})

// Delete single room
router.delete('/delete-room', auth, async (req, res) => {
    try {
        await deleteRoom(req, res)
    } catch (e) {
        console.error(e)
    }
})

// Admin and Client Handlers:
// Reserve room
router.get('/reserve-room', auth, async (req, res) => {
    try {
        await reserveRoom(req, res)
    } catch (e) {
        console.error(e)
    }
})

// export the routes so we can import them
// into our main app
module.exports = router
