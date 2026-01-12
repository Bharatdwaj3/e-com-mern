const mongoose = require("mongoose");
const Product = require("../models/product.model");
const cloudinary = require("../services/cloudinary.service");
 
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
    if (!req.body) req.body = {};

    const {
      type, brand, usage, price, size, color, material,
      power, port, wired, display, storage
    } = req.body;

    if (!type || !brand || !usage) {
      return res.status(400).json({ message: "Type, Brand and Usage are required" });
    }

    const productData = {
      type,
      brand,
      usage,
      price: Number(price) || 0,
      size: size || undefined,
      color: color || undefined,
      material: material || undefined,
      power: power === "true" ? true : power === "false" ? false : undefined,
      port: port || undefined,
      wired: wired === "true" ? true : wired === "false" ? false : undefined,
      display: display === "true" ? true : display === "false" ? false : undefined,
      storage: storage ? Number(storage) : undefined,
      userId: req.user.id
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        use_filename: true,
        resource_type: "image",
      });
      productData.imageUrl = result.secure_url;
      productData.cloudinaryId = result.public_id;
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error("createProduct error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (!req.body) req.body = {};

    const {
      type, brand, usage, price, size, color, material,
      power, port, wired, display, storage
    } = req.body;

    const updates = {
      type, brand, usage,
      price: price ? Number(price) : undefined,
      size, color, material,
      power: power === "true" ? true : power === "false" ? false : undefined,
      port,
      wired: wired === "true" ? true : wired === "false" ? false : undefined,
      display: display === "true" ? true : display === "false" ? false : undefined,
      storage: storage ? Number(storage) : undefined,
    };

    Object.keys(updates).forEach(k => updates[k] === undefined && delete updates[k]);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        use_filename: true,
      });
      updates.imageUrl = result.secure_url;
      updates.cloudinaryId = result.public_id;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error("updateProduct error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
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
