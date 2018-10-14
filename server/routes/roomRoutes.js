const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');

const Room = mongoose.model('Room');

module.exports = app => {
    app.post('/api/rooms', async (req, res) => {
        // new Room is constructor function, we pass in an object
        // so it should conform to the expected structure of the Room Schema
        let room = new Room({
            roomName: req.body.roomName,
            users: [
                      {
                        name: req.body.firstUserName, 
                        userId: '1', 
                        responses: []
                      },
                      {
                        name: req.body.secondUserName, 
                        userId: '2', 
                        responses: []
                      }
                   ]
        });
        // .save is a mongoose function that saves model to the DB
        room.save();
        res.json(room);
    });

// route below grabs all of the users in a given room and allows
// for functionality on dropdown menu for front-end of survey component
    app.get('/api/room/:roomId/users', async (req, res) => {
        let roomId = req.params.roomId;
        Room.findById(roomId, (err, room) => {
            if (err) {
                //err 500 if server messes up 
                res.status(500).json(err);
            // if database didn't explode, then server returns the room object with the
            // property 'questions' that we want for the endpoint
            } else {
                res.status(200).json(room.users);
            }
        });
    });

    // route below aims to get the questions of room schema from api 
    // req needs a params, get request cannot have a body unlike post req
    app.get('/api/room/:roomId/questions', async (req, res) => {
        let roomId = req.params.roomId;
        Room.findById(roomId, (err, room) => {
            if (err) {
                //err 500 if server messes up 
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

    
    // // attempt #1 post request for user responses: attempt failed. see code below it for attempt #2
    // // the mongoose function below should work but doesn't and has an error with the syntax of
    // // $set in the findByIdAndUpdate parameter. issue is from accessing nested object within array within object
    // app.post('/api/room/:roomId/:userId/submitResponses', async (req, res) => {
    //     let roomId = req.params.roomId;
    //     let userId = req.body.userId;
    //     Room.findByIdAndUpdate(roomId, {$set: {'users.0.responses': req.body.responses}}, {new: true}, (err, room) => {
    //         if(err) {
    //             res.status(500).json(err);
    //         } else {
    //             res.status(200).json(room);
    //         }
    //     })
    // });

    // attempt #2 post request for user responses
    app.post('/api/room/:roomId/:userId/submitResponses', async (req, res) => {
        let roomId = req.params.roomId;
        let userId = req.params.userId;
        Room.findById(roomId, (err, room) => {
            if (err) {
                //err 500 because server messed up 
                res.status(500).json(err);
            // if database didn't explode, then server returns the room object with the
            // property 'responses' that we want for the endpoint
            } else {
                // foundUser is the user that the client wants information from
                // we send back the responses from the found user
                // we use the .find array method on the models users array
                // .find takes a function that returns true or false
                // upon returning a 'true' value, .find will return the current iterated object -->
                // in this case .find returns the user with the id that our client wants
                // which it is grabbing from the users array in our room model
                if(room) {
                    // need to find user
                    let foundUser = room.users.find(user => user.userId == userId)
                    // need to update user responses
                    // user responses lives in req.body.responses 
                    foundUser.responses = req.body.responses;
                    // need to save the room
                    room.save();
                    res.status(200).json(foundUser);
                } else {
                    res.status(404).json('could not find room!');
                }
            }
        });
    })

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
            // property 'responses' that we want for the endpoint
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