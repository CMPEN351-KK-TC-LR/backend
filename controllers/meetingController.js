const Meeting = require('../models/MeetingModel') // Import meeting model
                                                  // so we can work with DB
                                                  // using Model
const mongoose = require('mongoose')

// Admin Only Functions:
// Get all meetings
const getAllMeetings = async (req, res) => {
    const meetings = await Meeting.find({}).sort({createdAt: -1})

    res.status(200).json(meetings)
}

// Admin and User Functions:
// Get meetings for single user
const getUserMeetings = async (req, res) => {
    
}

// Get a single meeting
const getMeeting = async (req, res) => {
    const{ id } = req.params

    if(!mongoose.Types.ObjectID.isValid(id)){
        return res.status(404).json({error: 'No meeting found'})
    }

    const meeting = await Meeting.findByID(id)

    if(!meeting){
        return res.status(400).json({error: 'No meeting found'})
    }
    
    res.status(200).json(meeting)
}

// Create a single meeting
const createMeeting = async (req, res) => {
    const {id, name, time, room, creator} = req.body

    try {
        const meeting = await Meeting.create({id, name, time, room, creator})
        res.status(200).json(meeting)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Update a single meeting
const updateMeeting = async (req, res) => {
    const{ id } = req.params

    if(!mongoose.Types.ObjectID.isValid(id)){
        return res.status(404).json({error: 'No meeting found'})
    }

    const meeting = await Meeting.findOneAndUpdate({_id: id}, {...req.body})

    if(!meeting){
        return res.status(400).json({error: 'No meeting found'})
    }

    res.status(200).json(meeting)
}

// Delete a single meeting
const deleteMeeting = async (req, res) => {
    const{ id } = req.params

    if(!mongoose.Types.ObjectID.isValid(id)){
        return res.status(404).json({error: 'No meeting found'})
    }

    const meeting = await Meeting.findOneAndDelete({_id: id})

    if(!meeting){
        return res.status(400).json({error: 'No meeting found'})
    }

    res.status(200).json(meeting)
}
module.exports = {
    getAllMeetings,
    getUserMeetings,
    getMeeting,
    createMeeting,
    updateMeeting,
    deleteMeeting
}
