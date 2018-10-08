const mongoose = require('mongoose');
const { Schema } = mongoose;


const MessageSchema = new Schema({
  timeStamp: { type: Date, default: Date.now },
  body: String
});


module.exports = mongoose.model('Message', MessageSchema)