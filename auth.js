const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
router.post('/register', async (req,res)=>{
  const {username, password} = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({username, password: hashed});
  res.json({message: 'User created', user});
});
router.post('/login', async (req,res)=>{
  const {username, password} = req.body;
  const user = await User.findOne({username});
  if(!user) return res.status(404).json({error:'User not found'});
  const match = await bcrypt.compare(password, user.password);
  if(!match) return res.status(401).json({error:'Wrong password'});
  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
  res.json({message:'Login successful', token});
});
module.exports = router;
