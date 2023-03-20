const mongoose = require('mongoose')

const buildingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    units: {
      type: Number,
      required: true
    },
    tenants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant'
    }]
  });



module.exports = mongoose.model("Building", buildingSchema);