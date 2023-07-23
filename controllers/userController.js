const User = require('../models/UserModel') // Import user model
                                                  // so we can work with DB
                                                  // using Model
const mongoose = require('mongoose')

// Admin Only Functions:
// Create Admin account
const createAdmin = async (req, res) => {
    const {id, email, name} = req.body

    try {
        const admin = await User.create({id, admin: true, email, name})
        res.status(200).json(admin)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Admin and Client Functions:
// Create Client account
const createClient = async (req, res) => {
    const {id, email, name} = req.body

    try {
        const client = await User.create({id, admin: false, email, name})
        res.status(200).json(client)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Update user profile information
const updateProfile = async (req, res) => {
    const{ id } = req.params

    if(!mongoose.Types.ObjectID.isValid(id)){
        return res.status(404).json({error: 'No profile found'})
    }

    const profile = await User.findOneAndUpdate({_id: id}, {...req.body})

    if(!profile){
        return res.status(400).json({error: 'No profile found'})
    }

    res.status(200).json(profile)
}
module.exports = {
    createAdmin,
    createClient,
    updateProfile
}