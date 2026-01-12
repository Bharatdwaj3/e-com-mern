const { default: mongoose } = require("mongoose");
const Customer = require("../models/customer.model");
const User = require("../models/user.model");
const cloudinary = require("../services/cloudinary.service"); 
const getCustomers = async (req, res) => {
  try {
    const Customers = await Customer.find({});
    res.status(200).json(Customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;  
    const [aggregatedCustomer] = await User.aggregate([
      { $match: { 
        _id: new mongoose.Types.ObjectId(id), 
        accountType: 'customer' 
      } 
    },
      {
        $lookup: {
          from: 'customer',
          localField: '_id',
          foreignField: 'userId',
          as: 'profile'
        }
      },
      { $unwind: { path: '$profile', preserveNullAndEmptyArrays: true } },
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

    if (!aggregatedCustomer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(aggregatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCustomer = async (req, res) => {

  try{
    const CustomerData=req.body;
    if(req.file){
      CustomerData.imageUrl=req.file.path;
      CustomerData.cloudinaryId=req.file.filename;
    }    
    const Customer =  await Customer.create(CustomerData);
    res.status(201).json(Customer);
  }catch(error){
    console.error("Error creating Customer: ".error);
    res.status(500).json({message: error.message});
  }
}

const updateCustomerProfile=async(req, res)=>{
  try{
    const userId = req.user.id;
    const user=await User.findById(userId);
    if(!user) return res.status(404).json({message: 'User not found'});
    if(user.accountType!='customer')
        return res.status(400).json({message: "You don't have permissions to edit this !!"});
    const profileData=req.body;
    if(req.file){
      profileData.imageUrl=req.file.path;
      profileData.cloudinaryId=req.file.filename;
    }
    const updatedProfile=await Customer.findOneAndUpdate(
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

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if(req.file){
      updateData.imageUrl=req.file.path;
      updateData.cloudinaryId=req.file.filename;
    }
    const Customer = await Customer.findByIdAndUpdate(id, updateData, {new: true});
    if (!Customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(Customer);
  } catch (error) {
    console.error("Error updating Customer: ",error);
    res.status(500).json({ message: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const customerProfile = await Customer.findOne({ 
      userId: new mongoose.Types.ObjectId(id) 
    });

    if (!customerProfile) {
      return res.status(404).json({ message: "Customer profile not found" });
    }

    if (customerProfile.cloudinaryId) {
      await cloudinary.uploader.destroy(customerProfile.cloudinaryId);
    }

    await Customer.deleteOne({ _id: customerProfile._id });

    res.status(200).json({ 
      message: "Customer profile deleted successfully",
      deletedCustomerId: customerProfile._id
    });

  } catch (error) {
    console.error("Error deleting Customer: ", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  updateCustomerProfile,
  deleteCustomer,
};
