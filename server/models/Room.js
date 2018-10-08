const mongoose = require('mongoose');
const { Schema } = mongoose;

// ref is referring to the module exports for the respective schemas
// LINDA!!! ADD REAL QUESTIONS TO DEFAULT ARRAY FOR QUESTIONS
const RoomSchema = new Schema({
    roomName: String,
    roomId: String,
    questions: { type: Array, 'default': ['question 1', 'question 2', 'question 3']},
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