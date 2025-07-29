const mongoose = require('mongoose');

const essentialSchema=new mongoose.Schema({
    product_type:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    material:{
        type:String,
        required:true
    },
    color:{
        type:Date,
        required:true
    },
    usage:{
        type:Date,
        required:true
    },
    power:{
        type:Boolean,
        required:true
    },
     imageUrl:{
        type:String
    },
    cloudinaryId:{
        type:String
    }
});

module.exports = essentialSchema;