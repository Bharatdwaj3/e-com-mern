const express = require('express');
const upload=require('./multer');
const router=express.Router();
const {getClothings, getClothing, createClothing, updateClothing, deleteClothing} = require('../controllers/clothingController.js');


router.get('/', getClothings);
router.get("/:id", getClothing);
router.post("/",upload.single('image'), createClothing);
router.put("/:id",upload.single('image'), updateClothing);
router.delete("/:id", deleteClothing);

module.exports=router;