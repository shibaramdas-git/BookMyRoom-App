const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    contactNumber: {type: Number, required: true},
    maxAllowed: {type: Number, required: true},
    rentPerDay: {type: Number, required: true},
    type: {type: String, required: true},
    imageUrls: [],
    currentBookings: {type: Number, required: true},
    description: {type: String, required: true},
}, {timestamps: true}   );

const roomModel = mongoose.model("rooms", roomSchema);

module.exports = roomModel;
/*roomModel(folder) has the power to access/perform operations with its files on DB.
 mongoose (obj) provieds this power + connection.*/
