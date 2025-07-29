const mongoose = require('mongoose');

const clothingSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    occupation:{
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
    }
});

module.exports = clothingSchema;