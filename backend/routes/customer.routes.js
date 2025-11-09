const express=require('express');
const upload=require('../services/multer.service');
const router=express.Router();
const{
    getCustomer, deleteCustomer,getCustomers, updateCustomerProfile
} =require('../controllers/customer.controller');

const checkPermission = require('../middleware/permission.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const authUser=require('../middleware/auth.middleware');

router.get('/',
    roleMiddleware(['admin','seller']),
    checkPermission('view_customers'),
    getCustomers);
router.get('/profile/:id',
    authUser, 
    roleMiddleware(['customer','admin']), 
    checkPermission('view_customer'),
    getCustomer);
router.put('/profile/:id',
    upload.single('image'), 
    authUser, 
    roleMiddleware(['customer']), 
    checkPermission('update_self'), 
    updateCustomerProfile);
router.delete('/profile/:id',
    authUser, 
    roleMiddleware(['admin']), 
    checkPermission('delete_customer'), 
    deleteCustomer,);

module.exports=router;