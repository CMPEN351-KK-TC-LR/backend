const mongoose = require('mongoose') // allows restricting allowed input objects
                                    // to DB
const Schema = mongoose.Schema // to create schema
const meetingSchema = new Schema({
    name: { // make sure each meeting has a String name
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 150
    },
    time: { // make sure each meeting has a time
        type: Date, // must invoke .markModified('time')
                    // when this is altered via Date object's
                    // collection of set() methods, before
                    // invoking await .save()
        required: true
    },
    room: { // require an associated room number
        type: Number,
        required: true,
        min: 1,
        max: 250
    },
    creator: { // Require that the request contains
               // UserId of the user creating the meeting
        type: mongoose.ObjectId,
        required: true
    },
    attendees: {
        type: [mongoose.ObjectId], // unique UserId's
        required: false
    }
}, {
    timestamps: true // make sure that meetings
                     // have creation and update timestamps
})

// export meeting module for use in app
module.exports = mongoose.model('Meeting', meetingSchema)
