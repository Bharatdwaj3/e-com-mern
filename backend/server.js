const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

require("dotenv").config();

const connectDB=require('./db');
const gadgetRoutes =require("./routes/gadgetRoutes");
const essentialRoutes =require("./routes/essentialRoutes");
const clothingRoutes =require("./routes/clothingRoutes");
const userRoutes =require("./routes/usersRoutes");
const app=express();

connectDB();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Server is ready');
});

app.use('/gadgets',gadgetRoutes);
app.use('/essential',essentialRoutes);
app.use('/clothing',clothingRoutes);
app.use('/user',userRoutes);

const port = process.env.PORT || 3005;

app.listen(port,()=>{
    console.log(`Serve at http:localhost:${port}`);
});