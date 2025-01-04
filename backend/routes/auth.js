const express= require('express');
const jwt=require('jsonwebtoken');
const User= require('../models/User');

const router= express.Router();

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

//for signup
router.post('/signup',async (req,res)=>{
    const {username,password,email}=req.body;
    try{
        const user=new User({username, password, email});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
});

router.post('/login',async (req,res)=>{
    const {email, password}=req.body;
    try{
        const user= await User.findOne({email});
        if (!user) return res.status(400).json({ error: 'User not found' });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid password' });
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;