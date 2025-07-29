const Gadget = require("../models/GadgetyModel");
const cloudinary = require("../services/cloudinary"); 
const getGadgets = async (req, res) => {
  try {
    const Gadgets = await Gadget.find({});
    res.status(200).json(Gadgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const Gadget = await Gadget.findById(id);
    res.status(200).json(Gadget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGadget = async (req, res) => {

  try{
    const GadgetData=req.body;
    if(req.file){
      GadgetData.imageUrl=req.file.path;
      GadgetData.cloudinaryId=req.file.filename;
    }    
    const Gadget =  await Gadget.create(GadgetData);
    res.status(201).json(Gadget);
  }catch(error){
    console.error("Error creating Gadget: ".error);
    res.status(500).json({message: error.message});
  }

}
const updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

   

    if(req.file){
      updateData.imageUrl=req.file.path;
      updateData.cloudinaryId=req.file.filename;
    }

    const Gadget = await Gadget.findByIdAndUpdate(id, updateData, {new: true});

    if (!Gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }

    res.status(200).json(Gadget);
  } catch (error) {
    console.error("Error updating Gadget: ",error);
    res.status(500).json({ message: error.message });
  }
};

const deleteGadget = async (req, res) => {
  try {
    const { id } = req.params;

    const Gadget = await Gadget.findByIdAndDelete(id);

    if (!Gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }

    if(Gadget.cloudinaryId){
      await cloudinary.uploader.destroy(Gadget.cloudinaryId);
    }

    res.status(200).json({ message: "Gadget deleted successfully" });
  } catch (error) {
    console.error("Error deleting Gadget: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGadgets,
  getGadget,
  createGadget,
  updateGadget,
  deleteGadget,
};
