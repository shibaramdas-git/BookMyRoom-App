const express = require('express');
const router = express.Router();    //lets get all powers of routing 

//lets get all DB related to room from roomModel
const Room = require('../models/room');

// lets build Api endpoints related to rooms
// 1st Endpoint  (api/rooms/...)
router.get('/getallrooms', async (req, res) => {
    try {
        const rooms = await Room.find();        //main code.
        res.send(rooms);                        //Check it @ postman
    } catch (error) {
        res.status(400).json({error});
    }
});

module.exports = router




