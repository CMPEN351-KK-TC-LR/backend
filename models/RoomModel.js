const mongoose = require('mongoose') // allows restricting allowed input objects
                                    // to DB
const Schema = mongoose.Schema // to create schema
const roomSchema = new Schema({
    number: { // required room number
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 250
    },
    specialRoom: {
        type: Boolean, // Rooms have two possible types
        required: true // true for this property means it's
                       // a special room and requires payment
                       // before booking a meeting.
    },
    meetings: { // keep track of all meetings
        type: Map, // meetings are uniquely identified by date
        of: Date,  // to ensure that no two meetings have the same
                   // time-slot.
        required: false
    }
})

// export the model so we can use in MVC
module.exports = mongoose.model('Room', roomSchema)
