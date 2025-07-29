const express=require('express')
const router=express.Router();
const {ManagementClient}=require('auth0')

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const management = new ManagementClient({
  domain:process.env.AUTH0_DOMAIN,
  clientId:process.env.AUTH0_CLIENT_ID,
  clienSecret:process.env.AUTH0_CLIENT_SECRET,
  scope:'update:users'
})

const updateMetadata=async(req, res)=>{
 try{
   const {userId, user_metadata}=req.body
  const updatedUser=await management.updateUser(
    {id: userId},
    {user_metadata}
  )
  res.status(200).json({
    message: 'User metadata updated successfully',
    user:updatedUser
  })
 }catch(error){
    console.log('Error updating user metadata:' ,error)
    res.status(500).json({message:error.message})
 }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  updateMetadata,
  router
};
