const { mongoose } = require("mongoose");
const complaint = require("../tenants/Complaint");


const feedbackSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
            required: true
        },
        complaint: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Complaint',
            required: true
        }
    }
)
module.exports = mongoose.model("Feedback", feedbackSchema);