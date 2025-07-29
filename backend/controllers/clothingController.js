const Clothing = require("../models/clothingModel");

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
    const Clothing = await Clothing.findById(id);
    res.status(200).json(Clothing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createClothing = async (req, res) => {
  try {
    const Clothing = await Clothing.create(req.body);
    res.status(200).json(Clothing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateClothing = async (req, res) => {
  try {
    const { id } = req.params;

    const Clothing = await Clothing.findByIdAndUpdate(id, req.body);

    if (!Clothing) {
      return res.status(404).json({ message: "Clothing not found" });
    }

    const updatedClothing = await Clothing.findById(id);
    res.status(200).json(updatedClothing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteClothing = async (req, res) => {
  try {
    const { id } = req.params;

    const Clothing = await Clothing.findByIdAndDelete(id);

    if (!Clothing) {
      return res.status(404).json({ message: "Clothing not found" });
    }

    res.status(200).json({ message: "Clothing deleted successfully" });
  } catch (error) {
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
