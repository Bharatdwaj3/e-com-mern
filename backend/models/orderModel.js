const mongoose = require('mongoose');
const orderSchema = require('../schemas/orderSchema');

orderSchema.methods.markAsPaid=function(paymentId, signature, method){
    this.paymentId=paymentId;
    this.signature=signature;
    this.paymentMethod=method;
    this.status='paid';
    this.paidAt=new Date();
    return this.save();
};

orderSchema.methods.markAsFailed=function(reason){
    this.status='failed';
    this.failureReason=reason;
    this.failedAt=new Date();
    return this.save();
};

orderSchema.methods.calculateTotals=function(){
    const subtotal=this.cartItems.reduce((sum, item)=>{
        return sum + (item.price*item.quantity);
    },0);

    const tax=subtotal*0.18;
    const shipping = subtotal > 500 ? 0 : 50;
    const discount = subtotal > 1000 ? subtotal * 0.05 : 0;
    const total = subtotal + tax + shipping - discount;

    this.calculations={
        subtotal,
        tax,
        shipping,
        discount,
        total
    };
    this.amount=total;
    return this.calculations;
}

orderSchema.statics.findByCustomerEmail=function(email){
    return this.find({'customerInfo.email': email}).sort({createdAt:-1});
}

orderSchema.statics.getStats=async function(){
    const stats = await this.aggregate([
        {
            $group: {
                _id: '$status',
                count: {$sum:1},
                totalAmount: {$sum:'$amount'}
            }
        }
    ]);
    return stats;
};

orderSchema.pre('save', function(next){
    if(this.isNew || this.isModified('cartItems')){
        this.calculateTotals();
    }
    next();
});

const orderModel=mongoose.model('orderModel',orderSchema,'Order');

module.exports=orderModel;