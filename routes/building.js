const express = require('express');
const Building = require('../model/admin/Building');

const building = express.Router()

//add new building
building.post("/:", async(req,res)=>{
    const building = new Building({
        name: req.body.name,
        address: req.body.address,
        units: req.body.units,
        tenants:req.body.tenants,
    });
    try {
        const savedBuilding = await building.save();
        res.status(201).send(savedBuilding);
    } catch (err) {
        res.status(500).json(err)
    }
})
//get building by id
building.get("/:id", async(req,res) =>{
    try{
        const building = await Building.findById(req.params.id);
        const {
            name,
            address,
            units,
            tenants,
        } = building._doc;
        res.status(201).json(building);
    } catch(err){
        res.status(500).json(err)
    }
});
//update building
building.put("/:id", async (req,res)=>{
    console.log(req.body)
    if (req.body.buildingId === req.params.id){
        try{
            const building = await Building.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
            res.status(200).json("Updated succesfully")
        } catch(error) {
            return res.status(500).json(error)
        }
    }else {
        return res.status(403).json("Cannot update")
    }

})
//get all buildings by id
building.get("/", async (req,res)=>{
    try{
        const buildings = await Building.find();
        res.status(200).json(buildings);

    } catch (err) {
        res.status(500).json(err)
    }
})
//delete building info
building.delete("/:id", async (req, res)=>{
    try{
        const admin = await Building.findById(req.body.userId)
        console.log(req.body.userId);
        console.log(admin.isAdmin);
        if (admin.isAdmin) {
            const building = await Building.findById(req.params.id);
            await building.deleteOne();
            res.status(200).json("Building deleted");
        } else {
            res.status(403).json("unauthorized")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = building;