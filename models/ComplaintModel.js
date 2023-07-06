const express = require('mongoose') // allows restricting allowed input objects
                                    // to DB
const Schema = mongoose.Schema // to create schema
const complaintSchema = new Schema({
    id: { // ensure each complaint created with unique ID
        type: mongoose.ObjectId
    },
    subject: { // complaints must have subject matters for easy
        type: String, // reading by admins
        required: true
    },
    email: { // use company email to submit complaint
        type: String, // all communication will be performed via email
        required: true // and system will only keep track of status of complaint    
                       // along with initial message, title, and other metadata
    },
    message: { // message body of complaint
        type: String,
        required: true // no empty complaint bodies.
                       // will need to validate elsewhere
                       // to ensure no all-space characters
                       // messages
    },
    resolved: { // To help with filtering complaints viewed by admins
        type: Boolean,
        required: true
    },
    resolutionDate: { // when marked resolved by admins, this should be set
                      // to the date/time of when the moment they mark it resolved
        type: Date
    }
}, {
    timestamps: true // make sure we keep track of date of last update
                     // and submission time for display in Admin console
})

// Export for management use by Admins
module.exports = mongoose.model('Complaint', complaintSchema)