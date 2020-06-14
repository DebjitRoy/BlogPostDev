const Post = require("../models/Post");
const ErrorResponse = require("../utils/errorResponse");

// GET All
module.exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// GET Single
module.exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      return res.status(200).json({ success: true, data: post });
    }
    res.status(400).json({ success: false });
  } catch (error) {
    console.log(`${error}`.red);
    next(new ErrorResponse(`Bootcamp ID ${req.params.id} not found`, 404));
  }
};

// CREATE/POST
module.exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// Update/PUT
module.exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (post) {
      return res.status(200).json({ success: true, data: post });
    }
    res.status(400).json({ success: false });
  } catch (error) {
    console.log(`${error}`.red);
    next(new ErrorResponse(`Bootcamp ID ${req.params.id} not found`, 404));
  }
};

// DELETE
module.exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post) {
      return res.status(200).json({ success: true, data: post });
    }
    res.status(400).json({ success: false });
  } catch (error) {
    console.log(`${error}`.red);
    next(new ErrorResponse(`Bootcamp ID ${req.params.id} not found`, 404));
  }
};
