const Payment = require('../models/PaymentMethodModel') // Import paymentmethod model
                                                        // so we can work with DB
                                                        // using Model
const mongoose = require('mongoose')

// Create a new payment method
// req.body should contain user's mongoose id, card number, ccv, expiration date and name on card
const createPaymentMethod = async (req, res) => {
    const {_id, cardNumber, ccv, expirationDate, nameOnCard} = req.body

    try {
        const payment = await Payment.create({_id, cardNumber, ccv, expirationDate, nameOnCard})
        res.status(200).json(payment)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Update payment method
// req.body should contain user's mongoose id and information to update
const updatePaymentMethod = async (req, res) => {
    const{ id } = req.body

    if(!mongoose.Types.ObjectID.isValid(id)){
        return res.status(404).json({error: 'Nothing found'})
    }

    const payment = await Payment.findOneAndUpdate({_id: id}, {...req.body})

    if(!payment){
        return res.status(400).json({error: 'Nothing found'})
    }

    res.status(200).json(payment)
}

// Charge for special room
// req.body should contain user's mongoose id
const chargeSpecialRoom = async (req, res) => {
    const{ id } = req.body

    if(!mongoose.Types.ObjectID.isValid(id)){
        return res.status(404).json({error: 'Nothing found'})
    }

    const payment = await Payment.findOne({_id: id})

    if(!payment){
        return res.status(400).json({error: 'Nothing found'})
    }

    // Used to simulate the system charging the user's payment method
    console.log("Charge $100 to user's account for special room.")

    res.status(200).json(payment)
}

module.exports = {
    createPaymentMethod,
    updatePaymentMethod,
    chargeSpecialRoom
}
