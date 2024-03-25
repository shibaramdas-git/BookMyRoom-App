const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const stripe = require("stripe")(
  "sk_test_51OwDqpSD77LA0xvVDYUvBUfO7W8MO63aCnMzY1oj0uj5QkuGv62j7VwuGUKljDau8toktTUKLPEIYRAzzajjswwz00RbQ25XXa"
);
const { v4: uuidv4 } = require("uuid"); //To generate a new uid whenever uuidv4() is called.

// Endpoint to handle payment & room booking.
router.post("/bookroom", async (req, res) => {
  const { room, userId, fromDate, toDate, totalAmount, totalDays, token } =
    req.body;
  
    try {
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      })
      var session = await stripe.checkout.sessions.create({
          customer: customer.id,
          currency: "inr",
          mode: 'payment',
          payment_method_types: ["card"],
          line_items: [
          {  price: 'price_1OwnzCSD77LA0xvVoGSzikJa',
             quantity: totalDays,
          },
          ],
          success_url: "http://localhost:5000/?success=true",
          cancel_url: "http://localhost:5000/?canceled=true",
        },
        { idempotencyKey: uuidv4(), }
      )
    } catch (error) {
      console.log(error);
    }


// if payment success- a. store booking data in DB ,    b.update currentBooking details of booked room.
  if(session) {
    try {
        // a. store booking data in DB
        const newBooking = new Booking({
            room: room.name,
            roomId: room._id,
            userId,
            fromDate,
            toDate,
            totalAmount,
            totalDays,
            transactionId: "123456",
          });
        const booking = await newBooking.save();

        //b.update currentBooking details of booked room 
        const updateRoom = await Room.findOne({ _id: room._id });
        updateRoom.currentBookings.push({
          bookingId: booking._id,
          fromDate: fromDate,
          toDate: toDate,
          userId: userId,
          status: booking.status,
        });
        await updateRoom.save();
    
        res.send("Your room booked successfully!!");
      } catch (error) {
        return res.status(400).json({ error });
      }
    }
  }  
)
//User req for bookings
router.post('/getbookingsbyuserid', async (req, res) => {
  const userId = req.body.userId;
try {
  const bookedRooms = await Booking.find({userId: userId})
  res.send(bookedRooms);
} catch (error) {
  console.log(error);
}
})
// Admin req for bookings
router.get('/getallbookings', async (req, res) => {
  try {
    const allBookings = await Booking.find({ })
  res.send(allBookings);
  } catch (error) {
  console.log(error);
  }
})

module.exports = router;
