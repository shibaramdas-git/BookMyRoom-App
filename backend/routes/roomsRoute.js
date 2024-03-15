const express = require('express');
const router = express.Router();    //lets get all powers of routing 

//lets get all DB related to room from roomModel
const Room = require('../models/room');

// lets build Api endpoints related to rooms
// 1st Endpoint  (api/rooms/...)
router.get('/getallrooms', async (req, res) => {
    try {
        const rooms = await Room.find();        //main code.
        res.send(rooms);                        //Response to client. Check it @ postman/chrome
    } catch (error) {
        res.status(400).json({ message: error });          //Response Error
    }
});

// 2nd Api endpoint
router.post('/getroombyid', async (req, res) => {
    const roomid = req.body.roomid;
    try {
        const room = await Room.findOne({ _id: roomid });
        res.send(room);                             //Response to client. Check it @ postman/chrome
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error });
    }
});


module.exports = router




