require('dotenv').config() // make env vars in .env available
                           // from process.env.VAR_NAME_HERE
const express = require('express') // make express.js available
const mongoose = require('mongoose') // Connect to MongoDB
// Import route handlers here
const meetingRoutes = require('./routes/meetings.js')
const complaintsRoutes = require('./routes/complaints.js')
const roomsRoutes = require('./routes/rooms.js')
const usersRoutes = require('./routes/users.js')
const paymentMethodRoutes = require('./routes/paymentMethod.js')

// instantiate app here
const app = express()

// Below also taken from: https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8
// If no private key set, end the application
if (!process.env.PRIV_KEY) {
    console.error("No signing key set.");
    process.exit(1);
}

// Middleware - handles requests and runs upon a request being received
app.use(express.json()) // makes any body passed in a request, be forwarded
                        // in the request argument of handler functions

// Connect route handlers defined in routes/ dir files
// to the app.
//
app.use('/api/meetings', meetingRoutes) // all path handlers inside meetingRoutes
                                        // are relative to path defined here in
                                        // first arg
app.use('/api/complaints', complaintsRoutes)  // all path handlers inside complaintsRoutes
                                            // are relative to path defined here in
                                            // first arg
app.use('/api/rooms', roomsRoutes)  // all path handlers inside roomsRoutes
                                            // are relative to path defined here in
                                            // first arg
app.use('/api/users', usersRoutes)  // all path handlers inside usersRoutes
                                            // are relative to path defined here in
                                            // first arg
app.use('/api/paymentMethod', paymentMethodRoutes)  // all path handlers inside paymentMethodRoutes
                                            // are relative to path defined here in
                                            // first arg

// Error handlers here for root
//
// Root path request error handler
app.use((err, req, res, next) => {
    console.error(err.stack) // print to console the error stack
    res.status(500).send(`It's not you, it's us.`) // Server error message
})

// Connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Only start listening on port to serve app 
        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
