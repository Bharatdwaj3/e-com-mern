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
    if (!res) return toast.error('Razorpay SDK failed to load');

    try {
      const { data } = await axios.post('/api/payments/create-order', {
        amount: subtotal,
        cartItems,
        customerInfo,
      });

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: 'INR',
        name: 'JoyCart',
        description: 'Thank you for your purchase!',
        order_id: data.orderId,
        handler: async (response) => {
          await axios.post('/api/payments/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            cartItems,
            customerInfo,
            amount: subtotal,
          });
          toast.success('Payment Successful! 🎉');
          localStorage.removeItem('cartItems');
          navigate('/order-success');
        },
        prefill: {
          name: customerInfo.name || '',
          email: customerInfo.email || '',
          contact: customerInfo.phone || '',
        },
        theme: { color: '#f97316' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error('Payment failed',err);
    }
  };

  return (
    <div className="fixed inset-0 bg-white">

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-10 border border-gray-100">
          <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>
          <div className="text-3xl font-bold text-center mb-12">
            Total: ₹{subtotal}
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-black hover:bg-gray-900 text-white font-bold text-xl py-6 rounded-xl transition transform hover:scale-105"
          >
            Pay ₹{subtotal} Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;