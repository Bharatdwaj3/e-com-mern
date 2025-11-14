const mongoose = require('mongoose');

let hasRun = false;

module.exports = async () => {
  if (hasRun) return;
  hasRun = true;

  try {
    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
    const result = await Product.updateMany(
      { payments: { $exists: false } },
      { $set: { payments: [] } }
    );
    console.log(`[Migration] Added payments[] to ${result.modifiedCount} products`);
  } catch (err) {
    console.error('[Migration] Failed:', err);
  }
};