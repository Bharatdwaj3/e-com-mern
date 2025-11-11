const Product = require("../models/product.model");
 
const getProducts = async (req, res) => {
  try {
    const Products = await Product.find({});
    res.status(200).json(Products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const Products = await Product.findById(id);
    res.status(200).json(Products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { type, brand, usage } = req.body;
    if (!type || !brand || !usage) {
      return res.status(400).json({
        success: false,
        message: 'type, brand, usage required',
        code: 'MISSING_FIELDS'
      });
    }

    const product = new Product({
      type: type.trim(),
      brand: brand.trim(),
      usage: usage.trim(),
      size: req.body.size?.trim(),
      color: req.body.color?.trim(),
      material: req.body.material?.trim(),
      power: req.body.power ?? null,
      port: req.body.port?.trim() ?? null,
      wired: req.body.wired ?? null,
      display: req.body.display ?? null,
      storage: req.body.storage != null ? Number(req.body.storage) : null,
      imageUrl: (req.body.imageUrl || '').trim(),
      cloudinaryId: (req.body.cloudinaryId || '').trim()
    });

    const saved = await product.save();
    res.status(201).json({
      success: true,
      message: 'Product created',
      data: saved
    });
  } catch (error) {
    console.error('createProduct error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data',
        code: 'VALIDATION_ERROR'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      code: 'CREATE_FAILED'
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID',
        code: 'INVALID_ID'
      });
    }

    const allowed = ['type','brand','usage','size','color','material','power','port','wired','display','storage','imageUrl','cloudinaryId'];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
        if (typeof req.body[key] === 'string') updates[key] = req.body[key].trim();
        if (['power','wired','display'].includes(key)) updates[key] = req.body[key] ?? null;
        if (key === 'port') updates[key] = req.body[key]?.trim() ?? null;
        if (key === 'storage') updates[key] = req.body[key] != null ? Number(req.body[key]) : null;
        if (['imageUrl','cloudinaryId'].includes(key)) updates[key] = (req.body[key] || '').trim();
      }
    }

    const updated = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        code: 'NOT_FOUND'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated',
      data: updated
    });
  } catch (error) {
    console.error('updateProduct error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data',
        code: 'VALIDATION_ERROR'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      code: 'UPDATE_FAILED'
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const ProductData = await Product.findByIdAndDelete(id);

    if (!ProductData.userId.toString()!==req.userr.id.toString()&& req.user.role!=='admin') {
      return res.status(404).json({ message: "Product not found" });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting Product: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
