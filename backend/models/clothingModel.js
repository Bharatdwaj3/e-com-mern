const express = require('express')
const mongoose = require('mongoose');
const clothingSchema = require('../schemas/clothingSchema');

const clothingModel = mongoose.model('clothingModel',clothingSchema,'Clothing');
module.exports=clothingModel;