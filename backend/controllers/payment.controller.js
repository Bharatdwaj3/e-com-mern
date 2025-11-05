const Razorpay = require('razorpay');
const crypto=require('crypto')
const Order=require('../models/order.model');
const { error } = require('console');

const razorpay=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
});

const createOrder =  async(req, res)=>{
    try{
        const {amount, currency='INR',cartItems, customerInfo}=req.body;
        if(!amount || !cartItems || !customerInfo){
            return res.status(400).json({
                success:false,
                message:'Missing required fields: amount, cartItems, or customerInfo'
            });
        }
        const amountInPaise=Math.round(amount*100);
        const options={
            amount: amountInPaise,
            currency: currency,
            receipt:`order_${Date.now()}`,
            notes:{
                coustomer_name:customerInfo.name,
                customer_email:customerInfo.email,
                items_count:cartItems.length,
            },
        };
        const razorpayOrder = await razorpay.orders.create(options);
        const orderData={
            razorpayOrderId:razorpayOrder.id,
            amount:amount,
            currency:currency,
            status:'created',
            cartItems:cartItems,
            customerInfo:customerInfo,
            createdAt:new Date(),
        };
        res.status(201).json({
            success: true,
            message:'Order created succesfully',
            data:{
                orderid:razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                key: process.env.RAZORPAY_KEY_ID,
            },
        });
    }catch(error){
        console.error('Error creatinng Razorpay order!',error);
        res.status(500).json({
            success:false,
            message:'Failed to create order',
            error: error.message,
        });
    }
};

const verifyPayment=async(req, res)=>{
    try{
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        }=req.body;
        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
            return res.status(400).json({
                success:false,
                message:'Missing payment verification parameters'
            });
        }

        const signatureBody=razorpay_order_id + "|" +  razorpay_payment_id;

        const expectedSignature=crypto
        .createHmac('sha256',process.env.RAZORPAY_KEY_SECRECT)
        .update(signatureBody.toString())
        .digest('hex');

        const isAuthentic = expectedSignature===razorpay_signature;
        if(isAuthentic){
            const payment=await razorpay.payments.fetch(razorpay_payment_id);
            res.status(200).json({
                success:true,
                message:'Payment verified successfully',
                data:{
                    orderId:razorpay_order_id,
                    paymentId:razorpay_payment_id,
                    status:'paid',
                    amount:payment.amount/100,
                    method:payment.method,
                    createdAt:payment.created_at,
                },
            });
        }else{
            console.error('Payment signagture verification failed');
            res.status(400).json({
                success:false,
                message:'Payment verfication failed Invalid signature',
            });
        }
    }catch(error){
        console.error('Error verifying payment !!',error);
        res.staus(500).json({
            success:false,
            message:'Payment verification failed',
            error:error.message,
        });
    }
};

const handlePaymentFailure=async(req, res)=>{
    try{
        const {order_id, payment_id, error_code, error_description}=req.body;
        console.log('Payment failed:',{
            orderId:order_id,
            paymentId:payment_id,
            errorCode:error_code,
            errorDescription:error_description,
        });
        res.status(200).json({
            success:false,
            message:'Payment failure recorded',
            data:{
                orderId:order_id,
                status:'failed',
                errorcode:error_code,
                errorDescription
            },
        });
    }catch(error){
        console.error('Error handling payment failure!',error);
        res.status(500).json({
            success:false,
            message:'Failed to process payment failure',
            error:error.message,
        });
    }
};

const getOrderStatus=async(req, res)=>{
    try{
        const {orderId}=req.params;
        const razorpayOrder=await razorpay.orders.fetch(orderId);
        const payments = await razorpay.orders.fetchPayments(orderId);
        res.status(200).json({
            success:true,
            data: {
                order: razorpayOrder,
                payments: payments.items,
                status: razorpayOrder.status,
            },
        });

    }catch(eror){
        console.error('Error fetching order status: ',error);
        res.status(500).json({
            success:false,
            message:'Failed to fetch order status',
            error:error.message,
        });
    }
}

module.exports={
    createOrder,
    verifyPayment,
    handlePaymentFailure,
    getOrderStatus,
};