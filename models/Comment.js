const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Please add a User Name"],
    maxlength: [100, "User Name can't be more than 100 characters"],
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, "Comment Title can't be more than 100 characters"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Comment Description can't be more than 500 characters"],
    required: [true, "Please add a Comment Description"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: true,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
