const Clothing = require("../models/clothingModel");
const cloudinary = require("../services/cloudinary"); 

const getClothings = async (req, res) => {
  try {
    const Clothings = await Clothing.find({});
    res.status(200).json(Clothings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClothing = async (req, res) => {
  try {
    const { id } = req.params;
    const clothingItem = await Clothing.findById(id);
    res.status(200).json(clothingItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createClothing = async (req, res) => {
  try {
    const clothData=req.body;
    if(req.file){
      clothData.imageUrl=req.file.path;
      clothData.cloudinaryId=req.file.filename;
    }  
    const clothing = await Clothing.create(req.body);
    res.status(200).json(clothing);
  } catch (error) {
    console.error("Error creating Cloth Item: ",error);
    res.status(500).json({ message: error.message });
  }
};

const updateClothing = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if(req.file){
      updateData.imageUrl=req.file.path;
      updateData.cloudinaryId=req.file.filename;
    }

    const clothing = await Clothing.findByIdAndUpdate(id, updateData, {new: true});

    if (!clothing) {
      return res.status(404).json({ message: "Clothing not found" });
    }

    res.status(200).json(updatedClothing);
  } catch (error) {
    console.error("Error updating Clothing: ",error);
    res.status(500).json({ message: error.message });
  }
};

const deleteClothing = async (req, res) => {
  try {
    const { id } = req.params;

    const clothing = await Clothing.findByIdAndDelete(id);

    if (!clothing) {
      return res.status(404).json({ message: "Clothing not found" });
    }

    if(clothing.cloudinaryId){
          await cloudinary.uploader.destroy(essential.cloudinaryId);
      }

    res.status(200).json({ message: "Clothing deleted successfully" });
  } catch (error) {
    console.error("Error deleting Clothing Item: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClothings,
  getClothing,
  createClothing,
  updateClothing,
  deleteClothing,
};
