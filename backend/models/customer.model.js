const express=require('express');
const mongoose=require('mongoose');
const customerSchema=require('../schemas/customer.schema');

const customerModel = mongoose.model('customerModel', customerSchema,'customer');
module.exports=customerModel;