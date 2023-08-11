const Room = require('../models/RoomModel') // Import room model
                                                  // so we can work with DB
                                                  // using Model
const mongoose = require('mongoose')

// Admin Only Functions:
// Create a single room
// req.body should contain room number and if it is special room
const createRoom = async (req, res) => {
    let {number, specialroom} = req.body

    specialroom = specialroom === "true" || specialroom === "True"

    try {
        const room = await Room.create({number, specialroom})
        res.status(200).json(room)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a single room
// req.body should contain room number
const deleteRoom = async (req, res) => {
    const { number } = req.body

    if(number < 0 || number > 250){
        return res.status(404).json({error: 'Nothing found'})
    }

    const room = await Room.findOneAndDelete({number})

    if(!room){
        return res.status(400).json({error: 'Nothing found'})
    }

    res.status(200).json(room)
}

// Admin and Client Functions:
// Reserve a single room (Also needs to charge if room is special)
// req.body should contain room number and meeting date
const reserveRoom = async (req, res) => {
    const{ num, meetingDate } = req.body

    if(!mongoose.Types.ObjectId.isValid(num)){
        return res.status(404).json({error: 'Nothing found'})
    }

    const room = await Room.findOne({number: num})

    if(room.meetings == meetingDate){
        return res.status(400).json({error: 'Room already reserved'})
    }

    await Room.updateOne({room}, {meetings: meetingDate})

    if(!room) {
        return res.status(400).json({error: 'Nothing found'})
    }

    res.status(200).json(room)
}
module.exports = {
    createRoom,
    deleteRoom,
    reserveRoom
}
