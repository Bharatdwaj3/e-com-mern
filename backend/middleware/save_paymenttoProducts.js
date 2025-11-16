const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
  if (req.originalUrl !== '/api/payments/verify' || !res.locals.verified) return next();

  const { cartItems, razorpay_order_id, razorpay_payment_id } = req.body;
  if (!cartItems?.length) return next();

  const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
  const paymentEntry = {
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    method: req.body.method || 'unknown',
    amount: (req.body.amount || 0) / 100,
    status: 'paid',
    timestamp: new Date()
  };

  const ops = cartItems.map(item => ({
    updateOne: {
      filter: { _id: item.productId },
      update: { $push: { payments: paymentEntry } }
    }
  }));

  try {
    await Product.bulkWrite(ops);
  } catch (err) {
    console.error('Payment log failed:', err);
  }

  next();
};