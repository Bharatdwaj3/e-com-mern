const mongoose = require('mongoose');

const gadgetSchema=new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    port:{
        type:String,
        required:true
    },
    wired:{
        type:Boolean,
        required:true
    },
    display:{
        type:Boolean,
        required:true
    },
    storage:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String
    },
    cloudinaryId:{
        type:String
    }
});


module.exports = gadgetSchema;