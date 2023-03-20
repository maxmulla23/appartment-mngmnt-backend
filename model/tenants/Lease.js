const mongoose = require('mongoose');


const leaseSchema = new mongoose.Schema(
    {
        leaseId: {
            type: String,
            required: true,
        },
        leaseStartDate: {
            type: Date,
            required: true,
        },
          leaseEndDate: {
            type: Date,
            required: true
        },
        leasedescription: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        building: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'building',
            required: true
        }
})

module.exports = mongoose.model("Lease", leaseSchema)