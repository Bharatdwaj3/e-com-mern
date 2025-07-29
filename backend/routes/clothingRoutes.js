const express = require('express');
const Clothing = require('../models/clothingModel.js');
const router=express.Router();
const {getClothings, getClothing, createClothing, updateClothing, deleteClothing} = require('../controllers/clothingController.js');


router.get('/', getClothings);
router.get("/:id", getClothing);
router.post("/", createClothing);
router.put("/:id", updateClothing);
router.delete("/:id", deleteClothing);

module.exports=router;