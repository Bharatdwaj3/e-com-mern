import mongoose from "mongoose";
import User from "../models/user.model.js";
import Content from "../models/content.model.js";
import cloudinary from "../services/cloudinary.service.js";
import type { RequestHandler } from "express";
import {
    req_putContent,req_postContent,
    res_postContent,res_putContent,res_getContent,res_listContent,res_delContent,
    res_error
} from '../types.js';


const getContents:RequestHandler =async(req, res:res_listContent)=>{
    try{

    }catch(error){
        console.error("Cannot get Contents!!",error);
        res.status(500).json({message: error.message});
    }
};

const getContent = async (req, res:res_getContent) => {
  try {
    const { id } = req.params;
    const Contents = await Content.findById(id);
    res.status(200).json(Contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createContent = async (req:req_postContent, res:res_postContent) => {
  try {
    if (!req.body) req.body = {};

    const {
        title, description, category, mediaType, author
    } = req.body;

    if (!title || !category || !author) {
      return res.status(400).json({
        message: "Title, Category and Author are required",
        deletedWriterId: ""
      });
    }

    const contentData = {
      title,
      category: category,
      author: author,
       mediaType: mediaType,
      description: description || undefined,
      userId: req.user.id
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "content",
        use_filename: true,
        resource_type: "image",
      });
      contentData.imageUrl = result.secure_url;
      contentData.cloudinaryId = result.public_id;
    }

    const content = new Content(contentData);
    await content.save();

    res.status(201).json(content);
  } catch (error) {
    console.error("create Content error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateContent = async (req:req_putContent, res:res_putContent) => {
  try {
    if (!req.body) req.body = {};

    const {
        title, description, category, mediaType, author
    } = req.body;

    const updates = {
      title, category, author,
      description: description,
      mediaType: mediaType
    };

    Object.keys(updates).forEach(k => updates[k] === undefined && delete updates[k]);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "contents",
        use_filename: true,
      });
      updates.imageUrl = result.secure_url;
      updates.cloudinaryId = result.public_id;
    }

    const content = await Content.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!content) return res.status(404).json({ message: "Product not found" });

    res.json(content);
  } catch (error) {
    console.error("update Content error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteContent = async (req, res:res_delContent) => {
  try {
    const { id } = req.params;
    const deletedContent = await Content.findByIdAndDelete(id);
    if (!deletedContent) {
      return res.status(404).json({
        message: "Content not found",
        deletedWriterId: ""
      });
    }
    res.status(200).json({
      message: "Content deleted successfully",
      deletedWriterId: ""
    });
  } catch (error:res_error) {
    res.status(500).json({
      message: error.message,
      deletedWriterId: ""
    });
  }
};

export {
  getContents,
  getContent,
  createContent,
  updateContent,
  deleteContent,
};