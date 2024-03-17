const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {timestamp: true});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
/*roomModel(folder) has the power to access/perform operations with its files on DB.
 mongoose (obj) provieds this power + connection.*/
