const mongoose = require('mongoose');
const { Schema } = mongoose;

// ref is referring to the module exports for the respective schemas
const RoomSchema = new Schema({
    admin: {type: Schema.Types.ObjectId, ref: 'User'},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    isPubliclyAvailable: Boolean,
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    isResolved: Boolean
});


module.exports = mongoose.model('Room', RoomSchema)