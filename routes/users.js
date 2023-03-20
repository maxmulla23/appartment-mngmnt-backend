const express = require('express')
const User = require("../model/tenants/User");


const user = express.Router()
//get user by ID
user.get("/:id", async (req, res)=>{
    try{
    const user = await User.findByid((req.params.id));
    const {
        firstname,
        lastname,
        email,
        password,
        usertype,
        phone,
        houseNumber,
        isAdmin,
        building,
    } = user._doc;
    res.status(200).json(other);
    }catch(error) {
    res.status(500).json(error);
    }
})

//get all users for admin
user.get("/", async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json(err)
    }
})
//update user by ID
user.put("/:id", async (req,res)=>{
        console.log(req.body)
        if (req.body.userId === req.params.id){
            try{
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                })
                res.status(200).json("Updated succesfully")
            } catch(error) {
                return res.status(500).json(error)
            }
        }else {
            return res.status(403).json("Cannot update this account")
        }
    
})

//make user admin
user.put('/:id', async (req, res)=>{
    try{
        const user = await User.findById(req.body.userId)
        const admin = await User.findById(req.body.userId)
        if(admin.isAdmin) {
            await user.updateOne({
                $set: { isAdmin: !user.isAdmin },
            });
            res.status(200).json('updated successfully')
        } else {
            res.status(403).json('cannot update')
        }

    } catch(error){
        res.status(500).json(error)
    }
})
//delete a user
user.delete("/:id", async (req, res)=>{
    try{
        const admin = await User.findById(req.body.userId)
        console.log(req.body.userId);
        console.log(admin.isAdmin);
        if (admin.isAdmin) {
            const user = await User.findById(req.params.id);
            await user.deleteOne();
            res.status(200).json("User deleted");
        } else {
            res.status(403).json("unauthorized")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = user;