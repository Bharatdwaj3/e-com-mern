const mongoose=require('mongoose');
require('dotenv').config();

const connectDB=()=>{
    mongoose
        .connect(process.env.MONGO_URI)
        .then(()=>console.log('DB Connected!!'))
        .catch((error)=>console.log('DB not connected!!'));
};

module.exports=connectDB;