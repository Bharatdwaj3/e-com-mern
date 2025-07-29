const express = require('express');
const router=express.Router();
const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/userController.js');
const { requireAuth } = require('../services/auth');
const { updateMetadata } = require('../controllers/userController.js');

router.patch('/update-metadata', requireAuth, updateMetadata);


module.exports=router;