const express = require('express')
const Lease = require('../model/tenants/Lease')
const User = require('../model/tenants/User')
const lease = express.Router()

//post lease
lease.post('/', async (req,res)=>{
    const newLease = new Lease(req.body)

    try {

        const savedLease = await newLease.save()
        res.status(201).json(savedLease)
    } catch(err) {
        res.json(500).json(err)
    }
})

//view lease details of tenant
lease.get('/lease/:id', async(req,res) =>{

    try{
        const currentUser = await User.findById((req.params.userid))
        const userLease = await Lease.find({ userId: currentUser._id })
        res.status(201).json(userLease)
    }catch(err) {
        res.status(500).json(err)
    }
})

//get all leases
lease.get('/', async(req,res) =>{
    try{
        const lease = await Lease.find()
        res.status(201).json(lease)
    }catch(err) {
        res.status(500).json(err)
    }
})
//get lease by ID
lease.get('/:id', async(req,res) =>{
    try{
        const lease = await Lease.findById(req.params.id)
        res.status(201).json(lease)
    }catch(err) {
        res.status(500).json(err)
    }
})
//delete lease by ID
lease.delete('/:id', async(req,res) =>{
    try{
        const lease = await Lease.findById(req.params.id)
        if(lease.userId === req.body.isAdmin || req.body.userId){
        await lease.deleteOne()
        res.status(201).json("lease deleted successfully")
        } else {
            res.status(403).json("cannot delete lease")
        }

    }catch(err) {
        res.status(500).json(err)
    }
})

//update lease by ID
lease.put('/:id', async(req,res) =>{
    const lease = await lease.findById(req.params.id)
    console.log(req.body);
    if(req.body.userId === req.params.id){
    try{
        const lease = await user.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        })
        res.status(201).json("updated successfully")
    }catch(err) {
        res.status(500).json(err)
    }
}
})

module.exports = lease