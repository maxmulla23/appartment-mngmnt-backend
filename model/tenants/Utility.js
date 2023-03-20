const mongoose = require('mongoose')


const utilitySchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Water', 'Electricity'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true
    }
  });

const Utility = mongoose.Schema('Utility', utilitySchema)

module.exports = Utility