const express=require('express');
const {
    createOrder,
    verifyPayment,
    handlePaymentFailure,
    getOrderStatus,
}=require('../controllers/paymentController');

const router = express.Router();

router.post('/create-order',createOrder);
router.post('/verify',verifyPayment);
router.post('/failure',handlePaymentFailure);
router.get('/order/:orderId', getOrderStatus);

module.exports=router;