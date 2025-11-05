const mongoose = require('mongoose');

const clothingSchema=new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    material:{
        type:String,
        required:true
    }, imageUrl:{
        type:String
    },
    cloudinaryId:{
        type:String
    }
});

module.exports = clothingSchema;