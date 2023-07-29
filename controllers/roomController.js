const Meeting = require('../models/RoomModel') // Import room model
                                                  // so we can work with DB
                                                  // using Model
const mongoose = require('mongoose')

// Admin Only Functions:
// Create a single room
const createRoom = async (req, res) => {
    const {number, specialroom} = req.body

    try {
        const room = await Room.create({number, specialroom})
        res.status(200).json(room)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a single room
const deleteRoom = async (req, res) => {
    const{ number } = req.params

    if(!mongoose.Types.ObjectID.isValid(number)){
        return res.status(404).json({error: 'No room found'})
    }

    const room = await Room.findOneAndDelete({_number: number})

    if(!room){
        return res.status(400).json({error: 'No room found'})
    }

    res.status(200).json(room)
}

// Admin and Client Functions:
// Reserve a single room (Also needs to charge if room is special)
// req.body should contain meeting info
const reserveRoom = async (req, res) => {
    const{ num } = req.params

    if(!mongoose.Types.ObjectId.isValid(num)){
        return res.status(404).json({error: 'No room found'})
    }

    const room = await Room.findOneAndUpdate({_number: num}, {...req.body})

    if(!room) {
        return res.status(400).json({error: 'No room found'})
    }

    res.status(200).json(room)
}
module.exports = {
    createRoom,
    deleteRoom,
    reserveRoom
}
