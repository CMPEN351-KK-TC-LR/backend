const mongoose = require('mongoose') // allows restricting allowed input objects
                                    // to DB
const Schema = mongoose.Schema // to create schema
const meetingSchema = new Schema({
    id: {
        type: mongoose.ObjectId // this will auto-populate with unique ID
                                // with String base type when constructor
                                // for this object model is called
        required: true
    },
    name: { // make sure each meeting has a String name
        type: String,
        required: true
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
        required: true
    },
    creator: { // Require that the request contains
               // UserId of the user creating the meeting
        type: mongoose.ObjectId,
        required: true
    },
    attendees: {
        type: [mongoose.ObjectId], // unique UserId's
    }
}, {
    timestamps: true // make sure that meetings
                     // have creation and update timestamps
})

// export meeting module for use in app
module.exports = mongoose.model('Meeting', meetingSchema)
