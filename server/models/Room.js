const mongoose = require('mongoose');
const { Schema } = mongoose;

// ref is referring to the module exports for the respective schemas
const RoomSchema = new Schema({
    roomName: String,
    questions: { type: Array, 'default': ['What do you want for yourself from this conversation?', 'What do you want for the other people involved?', 'How would you behave if you want to achieve this outcome?', 'What would you suggest as a solution to the shared outcome that you want for everyone involved?']},
    users: [
        { 
          name: String,
          userId: String,
          responses: [ String ]
        },
        {
          name: String,
          userId: String,
          responses: [ String ]
        }
    ]
});


module.exports = mongoose.model('Room', RoomSchema)