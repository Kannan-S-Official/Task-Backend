// app.js
const express = require('express');
const connectDB = require('./config/db');
const userRoutes=require('./routes/userRoutes')
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/users',userRoutes)

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get('/',(req,res)=>{
  res.send('hello')
})