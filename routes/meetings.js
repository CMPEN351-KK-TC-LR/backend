// make express available so we can setup Router
const express = require('express')

// Create instance of router so we can make routes for meetings
const router = express.Router()

// Create handlers. All of these have relative paths.
// The path is the first argument to the method.
// The paths are relative to the path specified
// in the first arg to the corresponding app.use
// inside our server.js


// export the routes so we can import them
// into our main app
module.exports = router