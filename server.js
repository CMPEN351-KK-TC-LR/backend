require('dotenv').config() // make env vars in .env available
                           // from process.env.VAR_NAME_HERE
const express = require('express') // make express.js available
// Import route handlers here
const meetingRoutes = require('./routes/meetings.js')
const complaintsRoutes = require('./routes/complaints.js')
const roomsRoutes = require('./routes/rooms.js')

// instantiate app here
const app = express()

// Middleware - handles requests and runs upon a request being receiveds
app.use(express.json()) // makes any body passed in a request, be forwarded
                        // in the request argument of handler functions

// Connect route handlers defined in routes/ dir files
// to the app.
//
app.use('/api/meetings', meetingRoutes) // all path handlers inside meetingRoutes
                                        // are relative to path defined here in
                                        // first arg
app.use('/api/meetings', complaintsRoutes)  // all path handlers inside complaintsRoutes
                                            // are relative to path defined here in
                                            // first arg
app.use('/api/meetings', roomsRoutes)  // all path handlers inside roomsRoutes
                                            // are relative to path defined here in
                                            // first arg

// Error handlers here for root
//
// Root path request error handler
app.use((err, req, res, next) => {
    console.error(err.stack) // print to console the error stack
    res.status(500).send(`It's not you, it's us.`) // Server error message
})

// Make server listen by creating UNIX socket to listen on.
// Set to DEV_PORT for local testing
// Set to PROD_PORT for production deployment
app.listen(process.env.DEV_PORT, () => {
    console.log(`listening on port ${process.env.DEV_PORT}`)
})
