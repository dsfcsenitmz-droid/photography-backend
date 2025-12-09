const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.get('/', (req,res)=>res.send('API running'));
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI).then(()=> {
  console.log('MongoDB connected');
  app.listen(PORT, ()=> console.log('Server running on ' + PORT));
}).catch(err=>console.error(err));
