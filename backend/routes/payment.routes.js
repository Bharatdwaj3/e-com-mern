const express = require('express');
const {
  createOrder,
  verifyPayment,
  handlePaymentFailure,
} = require('../controllers/payment.controller');

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const router = express.Router();

router.post('/create-order', 
  authMiddleware,
  roleMiddleware(['customer']), 
  createOrder
);

router.post('/verify', 
  authMiddleware,
  roleMiddleware(['customer']), 
  verifyPayment
);

router.post('/failure', 
  authMiddleware,
  roleMiddleware(['customer']), 
  handlePaymentFailure
);

module.exports = router;