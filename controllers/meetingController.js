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

// Get meetings for single time slot
// req.body should contain meeting date
const getTimeMeetings = async (req, res) => {
    const{ time } = req.body

    if(!mongoose.Types.ObjectID.isValid(time)){
        return res.status(404).json({error: 'Invalid time slot'})
    }

    const meetings = (await Meeting.find({}).filter({time: time}))

    if(!meetings){
        return res.status(400).json({error: 'No meetings found'})
    }
    
    res.status(200).json(meetings)
}

// Admin and User Functions:
// Get meetings for single user
// req.body should contain mongoose _id for a user
const getUserMeetings = async (req, res) => {
    const{ userID } = req.body

    if(!mongoose.Types.ObjectID.isValid(userID)){
        return res.status(404).json({error: 'No user found'})
    }

    const meetings = (await Meeting.find({}).filter({attendees: userID}))

    if(!meetings){
        return res.status(400).json({error: 'No meetings found'})
    }
    
    res.status(200).json(meetings)
}

// Get a single meeting by name
// req.body should contain meeting name
const getMeeting = async (req, res) => {
    const{ name } = req.body

    if(!mongoose.Types.ObjectID.isValid(name)){
        return res.status(404).json({error: 'No meeting found'})
    }

    const meeting = await Meeting.findOne({name: name})

    if(!meeting){
        return res.status(400).json({error: 'No meeting found'})
    }
    
    res.status(200).json(meeting)
}

// Create a single meeting
// req.body should contain meeting name, time, room number and creator id (user's mongoose _id)
const createMeeting = async (req, res) => {
    const {name, time, room, creator} = req.body

    try {
        const meeting = await Meeting.create({name, time, room, creator})
        res.status(200).json(meeting)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Update a single meeting by name
// req.body should contain meeting name and information to update
const updateMeeting = async (req, res) => {
    const{ name } = req.body

    if(!mongoose.Types.ObjectID.isValid(name)){
        return res.status(404).json({error: 'No meeting found'})
    }

    const meeting = await Meeting.findOneAndUpdate({name: name}, {...req.body})

    if(!meeting){
        return res.status(400).json({error: 'No meeting found'})
    }

    res.status(200).json(meeting)
}

// Delete a single meeting
// req.body should contain meeting name
const deleteMeeting = async (req, res) => {
    const{ name } = req.body

    if(!mongoose.Types.ObjectID.isValid(name)){
        return res.status(404).json({error: 'No meeting found'})
    }

    const meeting = await Meeting.findOneAndDelete({name: name})

    if(!meeting){
        return res.status(400).json({error: 'No meeting found'})
    }

    res.status(200).json(meeting)
}

module.exports = {
    getAllMeetings,
    getTimeMeetings,
    getUserMeetings,
    getMeeting,
    createMeeting,
    updateMeeting,
    deleteMeeting
}
