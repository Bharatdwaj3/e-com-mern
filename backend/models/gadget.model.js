const express = require('express')
const mongoose = require('mongoose');
const gadgetSchema = require('../schemas/gadget.schema');

const gadgetModel = mongoose.model('gadgetModel', gadgetSchema,'Gadget');
module.exports=gadgetModel;