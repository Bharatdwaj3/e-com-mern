const mongoose = require('mongoose');

const gadgetSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    dod:{
        type:Date,
        required:true
    },
    alive:{
        type:Boolean,
        required:true
    },
    religion:{
        type:String,
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