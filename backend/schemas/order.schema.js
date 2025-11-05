const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const orderSchema=new mongoose.Schema({
    RazorpayOrderId:{
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    paymentId:{
        type: String,
        default: null,
    },
    signature:{
        type: String,
        default: null,
    },
    amount :{
        type: Number,
        required: true,
        min: 0,
    },
    currency: {
        type: String,
        required: true,
        default: 'INR',
        enum: ['INR','USD','EUR'],
    },
    status: {
        type:String,
        required: true,
        enum: ['created', 'paid', 'failed', 'cancelled', 'refunded'],
        default:'created',
    },
    customerInfo:{
        name: {
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone:{
            type: String, 
            trim: true,
        },
        address:{
            street: String,
            city: String,
            state: String,
            pincode: String,
            country:{
                type: String,
                default: 'India',
            },
        },
    },
    cartItems: [{
        id:{
            type: String,
            required: true,
        },
        type:{
            type: String,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
            min: 1,
        },
        price:{
            type: Number,
            required: true,
            required: true,
            min: 0,
        },
        imageUrl: String,
        port: String,
        storage: Number,
        wired:Boolean, 
    }],
    calculation:{
        subtotal:{
            type:Number,
            required: true,
        },
        tax:{
            type: Number,
            default:0,
        }, 
        shipping: {
            type: Number,
            default:0,
        },
        discount:{
            type:Number,
            default:0,
        },
        total:{
            type:Number,
            required: true,
        },
    },
    paymentMethod:{
        type:String,
        enum:['card', 'netbanking', 'upi', 'wallet', 'emi'],
    },
    failureReason: {
        type: String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }, paidAt:{
        type:Date,
    }, failureAt:{
        type:Date,
    }, notes: {
        type: Map,
        of:String,
    }, refund:{
            refundId: String,
            amount: Number,
            status:{
                type: String,
                enum: ['pending', 'processed', 'failed'],
            },
            processedAt:Date,
            reason: String,
        },
    },{
        timestamps: true,
        toJSON:{
            transform: function(doc, ret){
                delete ret.__v;
                return ret;
            }
        }
    });

orderSchema.index({'customerInfo.email': 1});
orderSchema.index({status: 1});
orderSchema.index({createdAt: -1});

module.exports=orderSchema;