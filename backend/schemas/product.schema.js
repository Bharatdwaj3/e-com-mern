const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    type:{type:String,required:true},
    size:{type:String,required:true},
    brand:{type:String,required:true},
    color:{type:String,required:true},
    material:{type:String,required:true},

    usage:{type:String,required:true},
    power:{type:Boolean,required:true},

    port:{type:String,required:true},
    wired:{type:Boolean,required:true},
    display:{type:Boolean,required:true},
    storage:{type:Number,required:true},

    imageUrl:{type:String},
    cloudinaryId:{type:String}
});

module.exports = productSchema;