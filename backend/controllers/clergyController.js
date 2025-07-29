const Essential = require("../models/EssentialModel");

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
    const Essential = await Essential.findById(id);
    res.status(200).json(Essential);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEssential = async (req, res) => {
  try {
    const Essential = await Essential.create(req.body);
    res.status(200).json(Essential);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEssential = async (req, res) => {
  try {
    const { id } = req.params;

    const Essential = await Essential.findByIdAndUpdate(id, req.body);

    if (!Essential) {
      return res.status(404).json({ message: "Essential not found" });
    }

    const updatedEssential = await Essential.findById(id);
    res.status(200).json(updatedEssential);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEssential = async (req, res) => {
  try {
    const { id } = req.params;

    const Essential = await Essential.findByIdAndDelete(id);

    if (!Essential) {
      return res.status(404).json({ message: "Essential not found" });
    }

    res.status(200).json({ message: "Essential deleted successfully" });
  } catch (error) {
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
