const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');

const Room = mongoose.model('Room');

module.exports = app => {
    app.post('/api/rooms', async (req, res) => {
// new Room is constructor function, we pass in an object
// so it should conform to the expected structure of the 
// Room Schema
        let room = new Room({roomName: req.body.roomName});
// .save is a mongoose function that saves model to the DB
        room.save();
        res.json(room);
    });

// route below aims to get the questions of room schema from api 
    app.get('/api/room/:roomId', async (req, res) => {
        let room = new Room({questions: req.body.questions});
        room.send();
        res.json(room);
    });

 // UH OH how do i retrieve those responses?? 
    app.get('/api/room/:roomId', async (req, res) => {
        let room = new Room({users: req.body.questions});
//can i use save() here to insert the question responses into DB? 
        room.save();
        res.json(room);
    });













}