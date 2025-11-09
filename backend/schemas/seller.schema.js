const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    phone: { type: String, required: true, trim: true },
    storeName: { type: String, required: true, trim: true },
    businessType: { type: String, enum: ['individual', 'company'], default: 'individual' },
    address: { type: String, trim: true },
    taxId: { type: String, trim: true },
    
    
    rating: { type: Number, default: 0, min: 0, max: 5 },
    verified: { type: Boolean, default: false },

    imageUrl: { type: String, default: '' },
    cloudinaryId: { type: String, default: '' },
    },{
    timestamps: true,          
  }
);

module.exports = sellerSchema;
