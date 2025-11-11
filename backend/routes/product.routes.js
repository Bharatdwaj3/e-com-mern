const express=require('express');
const router=express.Router();
const upload=require('../services/multer.service');
const{
    getProduct, createProduct, updateProduct, deleteProduct,
    getProducts, 
} =require('../controllers/product.controller');

const authMiddleware = require('../middleware/auth.middleware');
const checkPermission = require('../middleware/permission.middleware');
const roleMiddleware = require('../middleware/role.middleware');


router.get('/',
    authMiddleware,
    roleMiddleware(['admin','seller','customer']),
    checkPermission('view_products'),
    getProducts);
router.post('/',
    authMiddleware,
    roleMiddleware(['seller','admin']),
    checkPermission('create_product'),
    createProduct);
    
router.delete('/:id',
    authMiddleware,
    roleMiddleware(['seller','admin']),
    checkPermission('delete_product'),
    deleteProduct);

module.exports=router;