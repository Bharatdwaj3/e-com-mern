const mongoose = require("mongoose");
const Seller = require("../models/seller.model");
const User = require("../models/user.model");
const cloudinary = require("../services/cloudinary.service");

const getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({}).lean();
    res.status(200).json(sellers);
  } catch (error) {
    console.error("getSellers error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getSeller = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid seller ID format" });
    }

    const [aggregatedSeller] = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          accountType: "seller",
        },
      },
      {
        $lookup: {
          from: "seller",
          localField: "_id",
          foreignField: "userId",
          as: "profile",
        },
      },
      { $unwind: { path: "$profile", preserveNullAndEmptyArrays: false } }, 
      {
       $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              _id: "$_id",
              fullName: "$fullName",
              email: "$email",
              accountType: "$accounTYpe",
            },
            {$ifNull: ["$profile",{}]},
          ],
        },
       },
      },
    ]);

    if (!aggregatedSeller) {
      return res.status(404).json({ message: "Seller profile not found" });
    }

    res.status(200).json(aggregatedSeller);
  } catch (error) {
    console.error("getSeller error:", error);
    res.status(500).json({ message: error.message });
  }
};

const createSeller = async (req, res) => {
  try {
    const sellerData = req.body;

    if (req.file) {
      sellerData.imageUrl = req.file.path;
      sellerData.cloudinaryId = req.file.filename;
    }

    const seller = await seller.create(sellerData);
    res.status(201).json(seller);
  } catch (error) {
    console.error("createSeller error:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateSellerProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.accountType !== "seller" && user.accountType !== "admin") {
      return res.status(403).json({ message: "You don't have permissions to edit this!" });
    }

    const profileData = { ...req.body, userId }; 
    let oldSeller = null;

    if (req.file) {
      profileData.imageUrl = req.file.path;
      profileData.cloudinaryId = req.file.filename;

      oldSeller = await Seller.findOne({ userId });
      if (oldSeller?.cloudinaryId) {
        await cloudinary.uploader.destroy(oldSeller.cloudinaryId);
      }
    }

    const updated = await Seller.findOneAndUpdate(
      { userId },
      { $set: profileData },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.error("updateSellerProfile error:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateSeller = async (req, res) => {
  try {
    const { id } = req.params; 
    const updateData = { ...req.body };

    const targetSeller = await Seller.findById(id);
    if (!targetSeller) return res.status(404).json({ message: "Seller not found" });

    const currentUser = await User.findById(req.user.id);
    const isOwner = targetSeller.userId.toString() === req.user.id;
    const isAdmin = currentUser?.accountType === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized to update this seller" });
    }

    if (req.file) {
      updateData.imageUrl = req.file.path;
      updateData.cloudinaryId = req.file.filename;

      if (targetSeller.cloudinaryId) {
        await cloudinary.uploader.destroy(targetSeller.cloudinaryId);
      }
    }

    const updated = await Seller.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error("updateSeller error:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteSeller = async (req, res) => {
  try {
    const { id } = req.params; 

    const deletedSeller = await Seller.findByIdAndDelete(id);
    if (!deletedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    if (deletedSeller.cloudinaryId) {
      await cloudinary.uploader.destroy(deletedSeller.cloudinaryId);
    }

    res.status(200).json({
      message: "Seller deleted successfully",
      deletedSellerId: deletedSeller._id,
    });
  } catch (error) {
    console.error("deleteSeller error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSellers,
  getSeller,
  createSeller,
  updateSellerProfile,
  updateSeller,
  deleteSeller,
};