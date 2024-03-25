const express = require("express");
const router = express.Router(); //lets get all powers of routing

//lets get all DB related to room from roomModel
const Room = require("../models/room");

// 1st Endpoint  (api/rooms/...)
router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find(); //main code.
    res.send(rooms); //Response to client. Check it @ postman/chrome
  } catch (error) {
    res.status(400).json({ message: error }); //Response Error
  }
});

// 2nd Api endpoint
router.post("/getroombyid", async (req, res) => {
  const roomId = req.body.roomId;

  try {
    const room = await Room.findOne({ _id: roomId }); //main code.
    res.send(room);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Admin req to add new room
router.post("/addnewroom", async (req, res) => {
  try {
    const newroomschema = new Room(req.body);
    await newroomschema.save();
    res.send('Your new room added to DB successfully. Thank you.')
  } catch (error) {
    return res.status(400).json({error});
  }
});

module.exports = router;
