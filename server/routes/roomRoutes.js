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
        let room = new Room({
            // roomName: req.body.roomName, 
            // commented out the real req to insert dummy JSON object below for postman testing
            roomName: 'tardiness',
            users: [
                {
                 name: 'bob', 
                 userId: '1', 
                 responses: 
                    [
                     'i want sally to stop being late', 
                     'i want sally to see that being late is affecting her other team-mates and is bad for the group', 
                     'i would be less snarky to sally and be honest about how her tardiness makes me feel instead of just being passive aggressive',
                     'i would like a new protocol for tardiness that we can implement for the group that sally can commit to'
                    ]
                },
                {
                 name: 'sally', 
                 userId: '2', 
                 responses: 
                    [
                     'i want bob to stop being so passive aggressive to me at work', 
                     'i want to the tension at work to be diffused and for people to stop resenting me', 
                     'i know that peers are frustrated with my tardiness, but i feel so burnt out from all the work i have to take home with me that it is hard to change my behavior. maybe we could balance out my workload more?',
                     'i would probably work on my tardiness and commit to being on time'
                    ]
                }
            ]
        });
// .save is a mongoose function that saves model to the DB
        room.save();
        res.json(room);
    });

// route below aims to get the questions of room schema from api 
// req needs a params, get request cannot have a body unlike post req
    app.get('/api/room/:roomId/questions', async (req, res) => {
        let roomId = req.params.roomId;
        Room.findById(roomId, (err, room) => {
            if (err) {
//err 500 because server messed up 
                res.status(500).json(err);
// if database didn't explode, then server returns the room object with the
// property 'questions' that we want for the endpoint
            } else {
                res.status(200).json(room.questions);
            }
        });
    });

// route below aims to post the responses of room schema from api for a given user
// req needs params, get request cannot have a body unlike post req
    app.post('/api/room/:roomId', async (req, res) => {
        let roomId = req.params.roomId;
        let userId = req.body.userId;
        Room.findByIdAndUpdate(roomId, {users: {userId: userId, responses: req.body.responses}, })
    });

// route below aims to get the responses of room schema from api for a given user
// req needs params, get request cannot have a body unlike post req
    app.get('/api/room/:roomId/:userId/responses', async (req, res) => {
        let roomId = req.params.roomId;
        let userId = req.params.userId;
        Room.findById(roomId, (err, room) => {
            if (err) {
//err 500 because server messed up 
                res.status(500).json(err);
// if database didn't explode, then server returns the room object with the
// property 'questions' that we want for the endpoint
            } else {
// foundUser is the user that the client wants information from
// we send back the responses from the found user
// we use the .find array method on the models users array
// .find takes a function that returns true or false
// upon returning a 'true' value, .find will return the current iterated object -->
// in this case .find returns the user with the id that our client wants
// which it is grabbing from the users array in our room model
                let foundUser = room.users.find(user => user.userId == userId)
                res.status(200).json(foundUser.responses);
            }
        });
    });
}