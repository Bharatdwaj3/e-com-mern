const express=require('express');
const router=express.Router();
const upload=require('../services/multer.service');
const{
    getSeller, deleteSeller, 
    getSellers,updateSellerProfile
    
} =require('../controllers/seller.controller');

const roleMiddleware = require('../middleware/role.middleware');
const checkPermission = require('../middleware/permission.middleware');
const authUser=require('../middleware/auth.middleware');

router.get('/',
    roleMiddleware(['admin','seller','customer']),
    checkPermission('view_sellers'),
    getSellers);
router.get('/:id',
    authUser, 
    roleMiddleware(['seller']), 
    checkPermission('view-self'),
    getSeller);
router.put('/profile/:id',
    upload.single('image'), 
    authUser, 
    roleMiddleware(['admin']), 
    checkPermission('update_seller'), 
    updateSellerProfile);
router.delete('/:id',
    roleMiddleware(['admin']), 
    checkPermission('delete_student'), 
    deleteSeller);

module.exports=router;