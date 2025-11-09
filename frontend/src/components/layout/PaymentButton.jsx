import React, { useState } from 'react'
import {Button, CircularProgress, Alert, Box} from '@mui/material';
import {CreditCard, CheckCircle, Error} from '@mui/icons-material';
import {toast} from 'react-toastify';
import axios from 'axios';


const PaymentButton = ({cartItems, customerInfo, amount, onSuccess, onFailure, className='',}) => {

  const [isLoading, setIsLoading]=useState(false);
  const [paymentStatus, setPaymentStatus]=useState(null);
  const [errorMessage, setErrorMessage]=useState('');

  const loadRazorpayScript=()=>{
    return new Promise((resolve)=>{
      if(window.Razorpay){
        resolve(true);
        return;
      }
      const script=document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async=true;

      script.onload=()=>resolve(true);
      script.onerror=()=>resolve(false);

      document.head.appendChild(script);
    });
  }

  const handlePaymentSuccess=async(response)=>{
    try{
      setIsLoading(true);
      setPaymentStatus('loading');
      console.log('Payment successful, verifing... ', response);

      const verficationResult=await axios.post(`http://localhost:4001/api/payments/verify`,{
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(verficationResult.data.success){
        setPaymentStatus('success');
        toast.success('Payment completed successfully!!');
        localStorage.removeItem('cartItems');
        if(onSuccess){
          onSuccess({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount: amount,
            verificationData: verficationResult.data.data,
          });
        }
      }else{
          throw new Error(verficationResult.data.message || 'Payment verification failed');
        }
    }catch(error){
      console.error('Payement verification error!!',error);
      setPaymentStatus('error');
      setErrorMessage(error.response?.data?.message || error.message || 'Verification failed');
      toast.error('Payment verification failed!!');
      if(onFailure){
        onFailure(error);
      }
    }finally{
      setIsLoading(false);
    }
  };

  const handlePaymentFailure=async(response)=>{
    try{
      console.log('Payment failed: ',response);
      await axios.post(`http://localhost:4001/api/payments/failure`,{
        order_id: response.error?.metadata?.order_id,
        payment_id: response.error?.metadata?.payment_id,
        error_code: response.error?.code,
        error_description: response.error?.description,
      },{
        headers:{
          'Content-Type':'application/json'
        }
      });

      setPaymentStatus('error');
      setErrorMessage(response.error?.description || 'Payment failed');
      toast.error(`Payemnt failed: ${response.error?.description || 'Unknown error'}`)
    
      if(onFailure){
        onFailure(response.error);
      }

    }catch(error){
      console.error("Error handling payment failure!!", error);
    }finally{
      setIsLoading(false);
    }
  }

  const handlePayment=async()=>{
    try{
      setIsLoading(true);
      setPaymentStatus("Loading");
      setErrorMessage(" ");

      if(!cartItems || cartItems.length===0){
        throw new Error("Cart is empty!");
      }
      if(!customerInfo.name || !customerInfo || !customerInfo.email){
        throw new Error("Customer informatin is required!");
      }
      if(!amount || amount<= 0){
        throw new Error("Invalid payment amount!");
      }
      const scriptLoaded=await loadRazorpayScript();
      if(!scriptLoaded){
        throw new Error("Unable to load payment")
      }
      console.log("Creating order...",{amount, cartItems, customerInfo});
      const orderResponse=await axios.post(`http://localhost:4001/api/payments/create-order`,{
        amount,
        cartItems,
        customerInfo,
      },{
        headers:{
          'Content-Type':'application/json'
        }
      });
      if(!orderResponse.data.success){
        throw new Error(orderResponse.data.message || 'Failed to create order');
      }
      const {orderId, amount: orderAmount, currency, key}=orderResponse.data.data;
      const razorpayOptions={
        key:key,
        amount:orderAmount,
        currency:currency,
        name:'Your Store Name',
        description:`Payment for ${cartItems.length} items`,
        image: '/logo.png',
        order_id: orderId,
        
        prefill:{
          name: customerInfo.name,
          email:customerInfo.email,
          contact:customerInfo.phone || '',
        },
        config:{
          display:{
            blocks:{
              banks: {
                name: "Pay using Net Banking",
                instruments:[
                  {
                    method:'netbanking',
                    banks:['HDFC','ICICI','SBI','AXIS','KOTAK'],
                  },
                ],
              },
              other:{
                name: 'Other Payment Modes',
                instruments: [
                  {method:'card'},
                  {method:'upi'},
                  {method:'wallet'},
                ],
              },
            },
            sequence: ['block.banks','block.other'],
            preferences:{
              show_default_blocks:true,
            },
          },
        },
        theme:{
          color:'#0891b2',
        },
        modal:{
          ondismiss:()=>{
            console.log("Payment modal dismissed");
            setIsLoading(false);
            setPaymentStatus(null);
            toast.info("Payment cancelled");
          },
        },
        handler:handlePaymentSuccess,
        retry:{
          enabled:true,
          max_count:3,
        },
        timeout:300,
        remember_customer:true,
      };
      const razorpay=new window.Razorpay(razorpayOptions);
      razorpay.on('payment.failed',handlePaymentFailure);
      razorpay.open();
    }catch(error){
      console.error("Payment initialization error!", error);
      setIsLoading(false);
      setPaymentStatus("error");
      setErrorMessage(error.response?.data?.message || error.message || "Payment failed");
      toast.error(error.response?.data?.message || error.message || "Payment failed");
      if(onFailure){
        onFailure(error);
      }
    }
  }

  const retryPayment=()=>{
    setPaymentStatus(null);
    setErrorMessage(" ");
    handlePayment();
  }

  const renderPaymentStatus=()=>{
    if(paymentStatus==='loading'){
      return(
        <Box className="flex items-center gap-2 mb-4">
          <CircularProgress size={20}/>
          <span className='text-blue-600'>Processing payment....</span>
        </Box>
      );
    }

if(paymentStatus==="success"){
  return(
    <Alert severity='success'
    icon={<CheckCircle/>}
    className="mb-4">
      Payment completed Successfully!
    </Alert>
  );
}

if(paymentStatus==='error'){
  return(
     <Alert 
      severity='error'
      icon={<Error/>}
      className="mb-4"
      action={
        <Button
          color="inherit"
          size="small"
          onClick={retryPayment}
          disabled={isLoading}
        >
          Retry
        </Button>
      }
      >
        {errorMessage || "Payment failed Please try again"}
    </Alert>
  );
}
return null;
}

  return (
    <>
      <Box className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        {renderPaymentStatus()}
        <Button
          variant="contained"
          size='large'
          fullWidth
          startIcon={
            isLoading ? (
              <CircularProgress size={20} color="inherit"/>
            ):paymentStatus==='success' ? (
              <CheckCircle/>
            ): (
              <CreditCard/>
            )
          }
          onClick={handlePayment}
          disabled={isLoading || paymentStatus === 'success'}
          className={`${paymentStatus==='success' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} py-3 text-lg font-semibold transition-all duration-300 ${className}`}
        >
          {isLoading ? 'Processing...' : paymentStatus === 'success' ? 'Payment Completed' : `Pay$ ${amount?.toFixed(2) || '0.00'}`}
        </Button>
        <Box className="mt-4 text-center">
          <p className='text-sm text-gray-600'>Secure payment powered b y Razorpay</p>
          <p className='text-xs text-gray-500 mt-1'>
            We accept all majhor credit cards, debit cards not banking UPI & wallets
          </p>
        </Box>
      </Box>
    </>
  )
}

export default PaymentButton