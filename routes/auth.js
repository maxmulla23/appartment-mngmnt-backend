const express = require('express');
const User = require('../model/tenants/User');
const AsyncHandler = require('express-async-handler')
const auth = express.Router();
const isLogin = require('../middleware/isLogin');
const bcrypt = require("bcryptjs");

//register new user
auth.post("/Register",AsyncHandler(async (req, res)=>{
  //const { name,email, password } = req.body

    //check if email exists
    const emailExists = await User.findOne({ email: req.body.email });
    if(emailExists) {
        throw new Error('email exists');
    }
    //hash password
        //salt
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
        
    

    //register new user
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        usertype: req.body.usertype,
        email: req.body.email,
        password: hashedpassword,
    });

    try{
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
    
}))
//login
auth.post('/Login', async(req, res)=>{
    try {
        //check if the email exists in the database
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          return res.status(400).json({ msg: "Wrong email or password" });
        }
    
        //password is correct
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword)
          return res.status(400).json({ msg: "Invalid password" });
    
        res.status(200).json(user);
      } catch (err) {
        console.log(err);


} 
});



const jwt = (id) =>{
    return jwt.sign({id}, 'anykey', {expiresIn:'5d'})
}

module.exports = auth
