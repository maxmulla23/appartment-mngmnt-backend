const express = require('express')
const Notice = require("../model/admin/Notice")
const User = require("../model/tenants/User")
const notice = express.Router()



//post new notice to tenants
notice.post("/", async (req, res)=>{
    const newNotice = new Notice(req.body)

    try{
        const savedNotice = await newNotice.save()
        res.status(201).json(savedNotice)
    }catch(err){
        res.json(500).json(err)
    }
})

//delete notice
notice.delete('/:id', async (req,res) =>{
    try{
        const notice = await notice.findById(req.params.id)

        if(notice.userId === req.body.isAdmin){
            await notice.deleteOne()
            res.status(200).json("deleted successfully")
        } else {
            res.status(403).json("cannot delete")
        }
        
    }catch(err) {
        res.status(500).json(err)
    }
})
//get all notices
notice.get('/', async(req, res)=>{
    try{
        const notice = await Notice.find()
        res.status(200).json(notice)
    }catch(err) {
        res.status(500).json(err)
    }
})

//get a notice
notice.get('/:id', async(req, res)=>{
    try{
        const notice = await Notice.findById(req.params.id)
        res.status(200).json(notice)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = notice