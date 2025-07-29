const express = require('express')
const mongoose = require('mongoose');
const essentialSchema = require('../schemas/essentialSchema');

const essentialModel = mongoose.model('essentialModel',essentialSchema,'Essential');
module.exports=essentialModel;