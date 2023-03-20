const mongoose = require('mongoose')

const noticeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    admin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    }],
    tenants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenant'
    }]
  });

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice