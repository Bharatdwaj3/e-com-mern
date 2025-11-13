const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Core descriptive fields — always required
  type: { type: String, required: true, trim: true },     // e.g., "Electronics", "Clothing", "Furniture"
  brand: { type: String, required: true, trim: true },    // e.g., "Sony", "IKEA"
  usage: { type: String, required: true, trim: true },    // e.g., "Home", "Work", "Outdoor"

  price: {type: Number,required: true},

  // Optional attributes — depend on product type
  size: { type: String, trim: true },                     // e.g., "15-inch", "Medium"
  color: { type: String, trim: true },
  material: { type: String, trim: true },

  // Technical / electronic properties (optional)
  power: { type: Boolean, default: null },                // true/false/null — null = not applicable
  port: { type: String, trim: true, default: null },
  wired: { type: Boolean, default: null },
  display: { type: Boolean, default: null },
  storage: { type: Number, min: 0, default: null },

  // Image references (optional)
  imageUrl: { type: String, trim: true, default: '' },
  cloudinaryId: { type: String, trim: true, default: '' }
}, {
  timestamps: true
});

module.exports = productSchema;
