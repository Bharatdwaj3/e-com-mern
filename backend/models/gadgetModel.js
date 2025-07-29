const express = require('express')
const mongoose = require('mongoose');
const gadgetSchema = require('../schemas/gadgetSchema');

const gadgetModel = mongoose.model('gadgetModel', gadgetSchema,'Gadget');
module.exports=gadgetModel;