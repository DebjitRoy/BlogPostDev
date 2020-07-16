const Comment = require("../models/Comment");
const Post = require("../models/Post");
const ErrorResponse = require("../utils/errorResponse");

// GET All
// /api/comments
// GET by Post Id
// /api/posts/:postId/comments
module.exports.getComments = async (req, res) => {
  try {
    let comments = [];
    if (req.params.postId) {
      comments = await Comment.find({ post: req.params.postId })
        .sort("-createdAt")
        .limit(20);
      return res
        .status(200)
        .json({ success: true, count: comments.length, data: comments });
    } else {
      comments = await Comment.find();
      res
        .status(200)
        .json({ success: true, count: comments.length, data: comments });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// GET single comment by id
// /api/comments/:id
module.exports.getComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    if (!commentId || !comment) {
      return next(
        new ErrorResponse(`Comment ID ${req.params.id} not found`, 404)
      );
    }

    return res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// CREATE Add comment
// /api/posts/:postId/comments
module.exports.addComment = async (req, res, next) => {
  try {
    req.body.post = req.params.postId;
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(new ErrorResponse(`Post ID ${req.params.id} not found`, 404));
    }
    const comment = await Comment.create(req.body);

    return res.status(201).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE single comment by id
// /api/comments/:id
module.exports.deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findByIdAndDelete(commentId);
    if (!commentId || !comment) {
      return next(
        new ErrorResponse(`Comment ID ${req.params.id} not found`, 404)
      );
    }

    return res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update/PUT
module.exports.updateComment = async (req, res, next) => {
  try {
    const cpmment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (post) {
      return res.status(200).json({ success: true, data: post });
    }
    res.status(400).json({ success: false });
  } catch (error) {
    next(new ErrorResponse(`Comment ID ${req.params.id} not found`, 404));
  }
};
