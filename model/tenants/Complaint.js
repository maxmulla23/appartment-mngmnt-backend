const mongoose = require("mongoose");

const { Schema } = mongoose;

const complaintSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'resolved'],
            default: 'open'
        },
        
        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        building: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'building',
            required: true
        }
    }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint