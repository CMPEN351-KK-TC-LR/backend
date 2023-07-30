const Complaint = require('../models/ComplaintModel')   // Import complaint model
                                                        // so we can work with DB
                                                        // using Model
const mongoose = require('mongoose')

// Admin only functions:
// Get all complaints
const getAllComplaints = async (req, res) => {
    const complaints = await Complaint.find({}).sort({createdAt: -1})

    res.status(200).json(complaints)
}

// Respond to a single complaint
// req.body should contain mongoose _id of complaint, reply and resolutionDate 
const updateComplaint = async (req, res) => {
    const{ id, reply, resolutionDate } = req.body

    if(!mongoose.Types.ObjectID.isValid(id)){
        return res.status(404).json({error: 'No complaint found'})
    }

    const complaint = await Complaint.findOneAndUpdate({_id: id}, {reply: reply, resolved: true, resolutionDate: resolutionDate})

    if(!complaint){
        return res.status(400).json({error: 'No complaint found'})
    }

    res.status(200).json(complaint)
}

// Admin and Client functions:
// Create a single complaint
// req.body should contain subject, email and message
const createComplaint = async (req, res) => {
    const {subject, email, message} = req.body

    try {
        const complaint = await Complaint.create({subject, email, message, resolved: false})
        res.status(200).json(complaint)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllComplaints,
    updateComplaint,
    createComplaint
}
