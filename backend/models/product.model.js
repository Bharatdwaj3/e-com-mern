const express = require('express')
const mongoose = require('mongoose');
const productSchema = require('../schemas/product.schema');

const productModel = mongoose.model('productModel', productSchema,'product');
module.exports=productModel;