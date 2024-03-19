const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');

router.post('/bookroom', async (req, res) => {
    const {room,
        userId,
        fromDate,
        toDate,
        totalAmount,
        totalDays } = req.body;
    
    const newBooking = new Booking({
        room: room.name,
        roomId: room._id,
        userId,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        transactionId: "123456" 
    })
    //1.    After payment successful -- store booking data in DB
    //2.    update currentBooking details of booked room.
    try {
        const booking = await newBooking.save();
        const updateRoom = await Room.findOne({_id: room._id});
        updateRoom.currentBookings.push({
            bookingId: booking._id,
            fromDate: fromDate,
            toDate: toDate,
            userId: userId,
            status: booking.status
        });
        await updateRoom.save();

        res.send("Your room booked successfully!!");

    } catch (error) {
        return res.status(400).json({error});
        
    }

})

module.exports = router;




