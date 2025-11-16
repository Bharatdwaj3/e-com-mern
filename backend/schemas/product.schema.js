const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

 userId: { 
  type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  type: { type: String, required: true, trim: true },     
  brand: { type: String, required: true, trim: true },    
  usage: { type: String, required: true, trim: true },    

  price: {type: Number,required: true},

  size: { type: String, trim: true },                     
  color: { type: String, trim: true },
  material: { type: String, trim: true },

  power: { type: Boolean, default: null },                
  port: { type: String, trim: true, default: null },
  wired: { type: Boolean, default: null },
  display: { type: Boolean, default: null },
  storage: { type: Number, min: 0, default: null },

  imageUrl: { type: String, trim: true, default: '' },
  cloudinaryId: { type: String, trim: true, default: '' }
}, {
  timestamps: true
});

module.exports = productSchema;
