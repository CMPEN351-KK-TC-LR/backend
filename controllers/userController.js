const User = require('../models/UserModel') // Import user model
                                                  // so we can work with DB
                                                  // using Model
const mongoose = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = process.env

let user = null;

// Validate a user's submitted registration information
const validateUser = async (user) => {
    const authObj = Joi.object({
        email: Joi.string().min(21).max(50).required(),
        name: Joi.string().min(3).max(30),
        password: Joi.string().min(15).max(50).required()
    })

    return authObj.validate(user)
}

// Validate user password for authentication or login
const validateLogin = async (user) => {
    const loginObj = Joi.object({
        _id: Joi.string().required(), // user id
        password: Joi.string().min(15).max(50).required() // password entered
    })

    return loginObj.validate(user)
}

// Create signing token
// takes a user Model and creates a token
// with only the minimum values needed to serve pages properly
const signToken = (user) => {
    const token = jwt.sign(
        { user_id: user._id, isAdmin: user.admin},
        config.PRIV_KEY,
        {
            expiresIn: "8h"
        }
    )
    return token
}

// Hash the password and store it in the database
const hashNStorePw = async (user) => {
    const safeErrorMsg = 'Unable to create new user'
    // Hash password
    try {
        user.password = await bcrypt.hash(user.password, 8)
    } catch {
        throw Error(safeErrorMsg)
    }

    // Store password
    if (user.password !== null) {
        await user.save();
    } else {
        throw Error(safeErrorMsg)
    }

    // Create token
    const token = signToken(user)

    return token // return token
}

// Admin Only Functions:
// Create Admin account
const createAdmin = async (req, res) => {
    const {email, name, password} = req.body

    user = new User({
        admin: true,
        email,
        name,
        password
    })
    
    try {
        token = await hashNStorePw(user)
        res.header('x-auth-token', token).send({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

// Client Functions:
// Create Client account
const createClient = async (req, res) => {
    const {email, name, password} = req.body

    user = new User({
        admin: false,
        email,
        name,
        password
    })

    try {
        token = await hashNStorePw(user)
        res.header('x-auth-token', token).send({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Log user in
const loginUser = async (req, res) => {
    const { _id, email, password } = req.body

    // User DB search variable
    let searchQuery = _id ? { _id } : { email };
    const user = await User.findOne(searchQuery)

    // Check password
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(400).send('Invalid password')

        // Create and sign token
        const token = signToken(user)
        delete user.password // Remove password before returning object
        res.header('x-access-token', token)
            .status(200)
            .json({
                _id: user._id,
                isAdmin: user.admin,
                token: token
            })
    } else {
        res.status(400).send('Invalid credentials')
    }
}


// Update user profile information
const updateProfile = async (req, res) => {
    const{ id } = req.params

    if(!mongoose.Types.ObjectID.isValid(id)){
        return res.status(404).json({error: 'No profile found'})
    }

    const profile = await User.findOneAndUpdate({_id: id}, {...req.body})

    if(!profile) {
        return res.status(400).json({error: 'No profile found'})
    }

    res.status(200).json(profile)
}

module.exports = {
    createAdmin,
    createClient,
    updateProfile,
    validateUser,
    loginUser,
    validateLogin
}