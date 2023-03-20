const express = require("express")
const { get } = require('mongoose')
const Complaint = require("../model/tenants/Complaint")
const Feedback = require('../model/admin/Feedback')
const Building = require('../model/admin/Building')
const User = require("../model/tenants/User")
const complaint = express.Router()
const feedback = express.Router()


//post new complaints
complaint.post("/", async (req, res)=>{
    const newComplaint =  new Complaint(req.body)

    try {
        
        const savedComplaint = await newComplaint.save()
        res.status(200).json(savedComplaint)
    } catch(err){
        res.json(500).json(err)
    }
})


//admin
//get a complaint
complaint.get('/:id', async (req, res)=>{
    try{
        const complaint = await Complaint.findById(req.params.id)
        res.status(200).json(complaint)
    } catch(err) {
        res.status(500).json(err)
    }
})

//get all complaints
complaint.get('/', async (req, res)=>{
    try {
    const complaints = await Complaint.find()
    res.status(200).json(complaints)
    } catch(err) {
        res.status(500).json(err)
    }
})

//feedback on complaints
feedback.put('/:id/feedback', async(req,res) =>{
    try{

        //check if complaints exist
        const complaint = await Complaint.findById(req.params.id)
        if(!complaint) {
            return res.status(404).json("not found")
        }

        //create feedback
        const feedback = new Feedback({
            complaintid,
            message,
            createdBy,
        })
        await feedback.save()

        //update complaint status to resolved
        complaint.status = 'resolved'
        await complaint.save()

        //send a response
        res.status(201).json("feedback created successfully")
    }catch(err) {
        res.status(500).json(err)
    }
})

//complaints by a specific user
complaint.get("/mycomplaints/:userId", async (req,res)=> {
    try{
        const currentUser = await User.findById(req.params.userId);
        const userComplaints = await Complaint.find({ userId: currentUser._id });
        re.status(200).json(userComplaints)
    }catch(err){
        res.status.json(err);
    }
})

//delete complaint by ID
complaint.delete('/:id', async(req,res) =>{
    try{
        const complaint = await Complaint.findById(req.params.id)

        if (complaint.userId === req.body.userId || req.body.isAdmin){
            await complaint.deleteOne()
            res.status(200).json("deleted successfully")
        } else {
            res.status(403).json("cannot delete complaint")
        }
        
    }catch(err) {
        res.status(500).json(err)
    }
})






module.exports = complaint