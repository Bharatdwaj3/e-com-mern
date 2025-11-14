const Razorpay = require('razorpay');
const crypto = require('crypto');
const productModel = require('../models/product.model');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const { amount, cartItems, customerInfo } = req.body;

    if (!amount || !cartItems?.length || !customerInfo) {
      return res.status(400).json({
        success: false,
        message: 'Missing amount, cartItems or customerInfo',
      });
    }

    const options = {
      amount: Math.round(amount * 100), // paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(201).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Create order failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      customerInfo,
      amount,
    } = req.body;

    const sign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (sign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const paymentData = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount: Number(amount),
      customerInfo,
      paidAt: new Date(),
      status: 'paid',
    };

    const productIds = cartItems.map((i) => i._id);

    await productModel.updateMany(
      { _id: { $in: productIds } },
      {
        $push: { payments: paymentData },
        $inc: { totalSales: 1, revenue: Number(amount) },
      }
    );

    // Reduce stock
    for (const item of cartItems) {
      await productModel.updateOne(
        { _id: item._id },
        { $inc: { stock: -item.quantity, soldCount: item.quantity } }
      );
    }

    res.json({
      success: true,
      message: 'Payment verified & saved in products',
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message,
    });
  }
};

const handlePaymentFailure = async (req, res) => {
  console.log('Payment failed:', req.body);
  res.json({ success: false, message: 'Payment failed', data: req.body });
};

module.exports = {
  createOrder,
  verifyPayment,
  handlePaymentFailure,
};