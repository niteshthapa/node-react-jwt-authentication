const express = require('express');
const app = express();

//DB Connection
//----------------------
const connectDB = require('./config/db');
connectDB();
const path = require('path');

//Middelware
//----------------------
app.use(express.json({extended:false}))

app.get('/',(req,res)=>{
    res.send("Working...")
})

//Define Routes
//----------------------
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/dashboard',require('./routes/dashboard'));
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
  }
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`))
