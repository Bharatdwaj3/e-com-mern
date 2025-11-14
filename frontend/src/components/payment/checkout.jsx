// src/pages/Checkout.jsx   ← CREATE THIS FILE NOW
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], subtotal = 0, customerInfo = {} } = state || {};

  if (!cartItems.length) {
    navigate('/cart');
    return null;
  }

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      toast.error('Razorpay SDK failed to load');
      return;
    }

    try {
      // 1. Create order
      const { data } = await axios.post('/api/payments/create-order', {
        amount: subtotal,
        cartItems,
        customerInfo,
      });

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: 'INR',
        name: 'Your Store Name',
        description: 'Thank you for shopping!',
        order_id: data.orderId,
        handler: async (response) => {
          try {
            // 2. Verify payment
            await axios.post('/api/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartItems,
              customerInfo,
              amount: subtotal,
            });

            toast.success('Payment Successful! 🎉');
            localStorage.removeItem('cartItems'); // ← CLEAR CART
            navigate('/order-success');
          } catch (err) {
            toast.error('Payment verification failed',err`.message);`);
          }
        },
        prefill: {
          name: customerInfo.name || '',
          email: customerInfo.email || '',
          contact: customerInfo.phone || '',
        },
        theme: { color: '#3399cc' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error('Payment failed',err`.message);`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="text-2xl font-bold mb-8">Total: ₹{subtotal}</div>
        <button
          onClick={handlePayment}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg text-xl"
        >
          Pay ₹{subtotal} Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;