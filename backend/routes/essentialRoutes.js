const express = require('express');
const upload=require('./multer');
const router=express.Router();
const {getEssentials, getEssential, createEssential, updateEssential, deleteEssential} = require('../controllers/essentialController.js');


router.get('/', getEssentials);
router.get("/:id", getEssential);
router.post("/",upload.single('image'), createEssential);
router.put("/:id",upload.single('image'), updateEssential);
router.delete("/:id", deleteEssential);

module.exports=router;