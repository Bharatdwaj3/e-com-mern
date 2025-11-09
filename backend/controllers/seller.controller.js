const { default: mongoose } = require("mongoose");
const Seller = require("../models/seller.model");
const User = require("../models/user.model");
const cloudinary = require("../services/cloudinary.service"); 
const getSellers = async (req, res) => {
  try {
    const Sellers = await Seller.find({});
    res.status(200).json(Sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSeller = async (req, res) => {
  try {
    const { id } = req.params;  
    const [aggregatedSeller] = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id), accountType: 'seller' } },
      {
        $lookup: {
          from: 'seller',
          localField: '_id',
          foreignField: 'userId',
          as: 'profile'
        }
      },
      { $unwind: { path: '$profile', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          accountType: 1,
          age: '$profile.age',
          gender: '$profile.gender',
          dept: '$profile.dept',
          major: '$profile.major',
          course: '$profile.course',
          imageUrl: '$profile.imageUrl'
        }
      }
    ]);

    if (!aggregatedSeller) return res.status(404).json({ message: 'Seller not found' });
    res.status(200).json(aggregatedSeller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSeller = async (req, res) => {

  try{
    const SellerData=req.body;
    if(req.file){
      SellerData.imageUrl=req.file.path;
      SellerData.cloudinaryId=req.file.filename;
    }    
    const Seller =  await Seller.create(SellerData);
    res.status(201).json(Seller);
  }catch(error){
    console.error("Error creating Seller: ".error);
    res.status(500).json({message: error.message});
  }
}

const updateSellerProfile=async(req, res)=>{
  try{
    const userId = req.user.id;
    const user=await User.findById(userId);
    if(!user) return res.status(404).json({message: 'User not found'});
    if(user.accountType!='seller' && user.accountType!='admin')
        return res.status(400).json({message: "You don't have permissions to edit this !!"});
    const profileData=req.body;
    if(req.file){
      profileData.imageUrl=req.file.path;
      profileData.cloudinaryId=req.file.filename;
    }
    const updatedProfile=await Seller.findOneAndUpdate(
      {userId: userId},
      {...profileData, userId: userId},
      {new: true, upsert: true, setDefaultsOnInsert: true}
    );
    res.status(200).json(updatedProfile);
  }catch(error){
    console.error("Profile update error: ",error);
    res.status(500).json({message: error.message});
  }
}

const updateSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if(req.file){
      updateData.imageUrl=req.file.path;
      updateData.cloudinaryId=req.file.filename;
    }
    const Seller = await Seller.findByIdAndUpdate(id, updateData, {new: true});
    if (!Seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json(Seller);
  } catch (error) {
    console.error("Error updating Seller: ",error);
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

    if(deletedSeller.cloudinaryId){
      await cloudinary.uploader.destroy(Seller.cloudinaryId);
    }

    res.status(200).json({ message: "Seller deleted successfully" });
  } catch (error) {
    console.error("Error deleting Seller: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSellers,
  getSeller,
  createSeller,
  updateSeller,
  updateSellerProfile,
  deleteSeller,
};
