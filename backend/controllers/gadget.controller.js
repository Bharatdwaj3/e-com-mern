const Gadget = require("../models/gadget.model");
const cloudinary = require("../services/cloudinary.service"); 
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
    const Gadgetitem = await Gadget.findById(id);
    res.status(200).json(Gadgetitem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGadget = async (req, res) => {

  try{
    const gadgetData=req.body;
    if(req.file){
      gadgetData.imageUrl=req.file.path;
      gadgetData.cloudinaryId=req.file.filename;
    }    
    const gadget =  await Gadget.create(gadgetData);
    res.status(201).json(gadget);
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

    const gadget = await Gadget.findByIdAndUpdate(id, updateData, {new: true});

    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }

    res.status(200).json(gadget);
  } catch (error) {
    console.error("Error updating Gadget: ",error);
    res.status(500).json({ message: error.message });
  }
};

const deleteGadget = async (req, res) => {
  try {
    const { id } = req.params;

    const gadget = await Gadget.findByIdAndDelete(id);

    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }

    if(gadget.cloudinaryId){
      await cloudinary.uploader.destroy(gadget.cloudinaryId);
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
