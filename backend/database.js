const mongoose = require('mongoose');

async function main () {
    try {
        await mongoose.connect('mongodb+srv://Dasmongodb:Dasmongodb@cluster0.hnnl1l7.mongodb.net/bookMyRoom-DB');
        console.log("Connected to DB")
    } catch (err) {
        console.log(err);
    }
}

main();

module.exports = mongoose;
//Now OBJECT "mongoose" has the connection to DB, to use DB - use this object .