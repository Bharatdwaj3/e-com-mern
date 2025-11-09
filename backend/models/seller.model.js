const express=require('express');
const mongoose=require('mongoose');
const sellerSchema=require('../schemas/seller.schema');

const sellerModel = mongoose.model('sellerModel', sellerSchema,'seller');
module.exports=sellerModel;