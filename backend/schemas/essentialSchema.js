const mongoose = require('mongoose');

const essentialSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    Hpst:{
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

module.exports = essentialSchema;