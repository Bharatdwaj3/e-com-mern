const Essential = require("../models/essentialModel");
const cloudinary = require("../services/cloudinary"); 
const getEssentials = async (req, res) => {
  try {
    const Essentials = await Essential.find({});
    res.status(200).json(Essentials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEssential = async (req, res) => {
  try {
    const { id } = req.params;
    const essentialitem = await Essential.findById(id);
    res.status(200).json(essentialItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEssential = async (req, res) => {

  try{
    const essentialData=req.body;
    if(req.file){
      essentialData.imageUrl=req.file.path;
      essentialData.cloudinaryId=req.file.filename;
    }    
    const essential =  await Essential.create(essentialData);
    res.status(201).json(essential);
  }catch(error){
    console.error("Error creating Essential Item: ",error);
    res.status(500).json({message: error.message});
  }
}
const updateEssential = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

   

    if(req.file){
      updateData.imageUrl=req.file.path;
      updateData.cloudinaryId=req.file.filename;
    }

    const essential = await Essential.findByIdAndUpdate(id, updateData, {new: true});

    if (!essential) {
      return res.status(404).json({ message: "Essential Item not found" });
    }

    res.status(200).json(essential);
  } catch (error) {
    console.error("Error updating Essential: ",error);
    res.status(500).json({ message: error.message });
  }
};

const deleteEssential = async (req, res) => {
  try {
    const { id } = req.params;

    const essential = await Essential.findByIdAndDelete(id);

    if (!essential) {
      return res.status(404).json({ message: "Essential Item not found" });
    }

    if(essential.cloudinaryId){
      await cloudinary.uploader.destroy(essential.cloudinaryId);
    }

    res.status(200).json({ message: "Essential item deleted successfully" });
  } catch (error) {
    console.error("Error deleting Essential Item: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEssentials,
  getEssential,
  createEssential,
  updateEssential,
  deleteEssential,
};
