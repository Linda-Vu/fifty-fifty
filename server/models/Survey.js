const mongoose = require('mongoose');
const { Schema } = mongoose;

const SurveySchema = new Schema({
    room: {type: Schema.Types.ObjectId, ref: 'Room'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    responses: [ String ],
    dateSent: Date,
    dateResolved: Date,
    actionPlan: String
});

module.exports = mongoose.model('Survey', SurveySchema);