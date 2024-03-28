const mongoose = require('mongoose');

async function main () {
    try {
        await mongoose.connect(process.env.BASE_URLTOCONNECTDB);
        console.log("Connected to DB")
    } catch (err) {
        console.log(err);
    }
}
main();

module.exports = mongoose;
//Now OBJECT "mongoose" has the connection to DB, to use DB - use this object .