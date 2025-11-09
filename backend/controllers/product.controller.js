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

  try{

    const {userId}=req.params;
    const {name, code, dept}=req.body;
    if(req.user.id.toString()!==userId){
      return res.status(403).json({message: "You can only create Products for yourself!"})
    }

    const ProductData = await Product.create({
      userId,
      name,
      code, dept
    });
    res.status(201).json(ProductData);
  }catch(error){
    console.error("Error creating Product: ".error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "You already have a Product with this code" });
    }
    res.status(500).json({message: error.message});
  }
}
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const ProductData = await Product.findByIdAndUpdate(id, updateData, {new: true});
    if (!ProductData) {
      return res.status(404).json({ message: "Product not found" });
    }
    if(ProductData.userId.toString()!=req.user.id.toString()&& req.user.role!=='admin'){
      return res.status(403).json({message: "You can only update your own Products "})
    }
    const updatedProduct=await Product.findByIdAndUpdate(
      id, updateData, {new : true, runValidators: true}
    );

    res.status(200).json(Product);
  } catch (error) {
    console.error("Error updating Product: ",error);
    res.status(500).json({ message: error.message });
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
