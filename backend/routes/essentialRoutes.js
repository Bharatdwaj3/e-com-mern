const express = require('express');
const Essential = require('../models/essentialModel.js');
const router=express.Router();
const {getEssentials, getEssential, createEssential, updateEssential, deleteEssential} = require('../controllers/essentialController.js');


router.get('/', getEssentials);
router.get("/:id", getEssential);
router.post("/", createEssential);
router.put("/:id", updateEssential);
router.delete("/:id", deleteEssential);

module.exports=router;