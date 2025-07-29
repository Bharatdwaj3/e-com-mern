const express = require('express');
const upload=require('./multer.js');
const router=express.Router();
const {getGadgets, getGadget, createGadget, updateGadget, deleteGadget} = require('../controllers/gadgetController.js');


router.get('/', getGadgets);
router.get("/:id", getGadget);
router.post("/",upload.single('image'), createGadget);
router.put("/",upload.single('image'), updateGadget);
router.delete("/:id", deleteGadget);

module.exports=router;