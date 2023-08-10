// make express available so we can setup Router
const express = require('express')

const {     
    createPaymentMethod,
    updatePaymentMethod,
    chargeSpecialRoom
} = require('../controllers/paymentMethodController') // Import paymentMethodController 
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
// Create new payment information
router.post('/create-paymentMethod', auth, async (req, res) => {
    try {
        await createPaymentMethod(req, res)
    } catch (e) {
        console.error(e)
    }
})

// Update payment information
router.patch('/update-paymentMethod', auth, async (req, res) => {
    try {
        await updatePaymentMethod(req, res)
    } catch (e) {
        console.error(e)
    }
})

// Charge for special room if user has payment method stored
// Should be used before reserving a special room to charge user
router.get('/charge-specialroom', auth, async (req, res) => {
    try{
        await chargeSpecialRoom(req, res)
    } catch (e) {
        console.error(e)
    }
})

// export the routes so we can import them
// into our main app
module.exports = router
