const express = require('express')
const mongoose = require('mongoose');
const clothingSchema = require('../schemas/clothing.schema');

const clothingModel = mongoose.model('clothingModel',clothingSchema,'Clothing');
module.exports=clothingModel;