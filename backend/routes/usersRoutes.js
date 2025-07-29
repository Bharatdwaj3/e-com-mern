//const { v4: uuidv4 } = require('uuid');
const express = require('express');
//const User = require('../models/UserModel');
const router=express.Router();
const {getUsers, getUser, createUser, updateUser, deleteUser} = require('../controllers/userController.js');
// const cookieParser = require('cookie-parser');
const { requireAuth } = require('../services/auth');
const { updateMetadata } = require('../controllers/userController.js');

router.patch('/update-metadata', requireAuth, updateMetadata);
{/*
router.get('/', getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.use(cookieParser());

router.get('/profile',async(req,res)=>{
  try{
    const cookie=req.cookies.userSession;
    if(!cookie){
      return res.status(401).json({error: 'Please login to view your profile'})
    }
    const [username] =  cookie.split('-');
    if(!username){
      return res.status(400).json({error: 'Invalid session format'})
    }
    const user =await User.findOne({username: username.trim()});
    if(!user){
      return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json({
      username: user.username,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      karma: user.karma || 0,
      isVerified: user.isVerified || false
    });
  }catch(error){
    res.status(500).json({error: 'Failed to load profile'});
  }
});

router.post('/login',async(req, res)=>{
   let {username, password}=req.body;
  username=username.trim();
  password=password.trim();
  try{
    const user = await User.findOne({username: username});
    if(user && user.password.trim()===password){
      const sessionToken=uuidv4();
      const cookieValue=`${username}-${sessionToken}`;
      res.cookie('userSession',cookieValue,{
        httpOnly:true,
        maxAge:3600000,
        path:'/'
      });
      return res.status(200).json({
        success:true,
        loggedIn:true,
        username:username,
        message:'Login Successful'
      });
    }else{
        return res.status(401).json({
        error:'Invalid username or pasword'
      });
    }
  }catch(error){
    return res.status(500).json({
       success:false,
      error:'Login failed Please try again'
    });
  }
});


router.post('/logout',async(req, res)=>{
  try{
    res.clearCookie('userSession',{
      httpOnly:true,
      path:'/'
    });
    return res.status(200).json({
      success:true,
      message:'Logged out successfully'
    });
  }catch(error){
    return res.status(500).json({
      success:false,
      error:'Logout Failed'
    });
  }
});
*/}

module.exports=router;