const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required:true,
      max: 1024,
      min: 6,
    },
    usertype: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false
    },
    houseNumber: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required:true,
    },
    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Building',
      required: false
    }
  });
 

module.exports = mongoose.model("User", userSchema);
