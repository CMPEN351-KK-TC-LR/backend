const mongoose = require('mongoose') // allows restricting allowed input objects
                                    // to DB
const Schema = mongoose.Schema // to create schema
const paymentMethodSchema = new Schema({
    _id: { // Make the user associate his ID with their payment method in the request
        type: Number,
        required: true
    },
    // require storage of basic info needed to submit
    // credit card payment.
    // Our app only allows payment with credit cards
    cardNumber: { // credit card number
        type: Number,
        required: true
    },
    ccv: {
        type: Number, // the 3 digits on backside of card
        required: true
    },
    expirationDate: {
        type: String, // will perform string validation
        required: true // elsewhere to verify
                       // the expiration date is in correct format
                       // and date is valid
    },
    nameOnCard: { // Need name present on the card
        type: String,
        required: true
    }
})

// Export for management by app
module.exports = mongoose.model('PaymentMethod', paymentMethodSchema)
