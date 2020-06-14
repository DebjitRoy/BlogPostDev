const mongoose = require("mongoose");

const Section = require("./Section");
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a Title"],
    unique: [true, "Title should be unique"],
    trim: true,
    maxlength: [100, "Title can't be more than 100 characters"],
  },
  postType: {
    type: String,
    enum: ["travel", "books", "miscl"],
    required: [true, "Please add a Post Type"],
  },
  gist: {
    type: String,
    required: [true, "Please add a Post short description"],
    maxlength: [500, "Short description can't be more than 500 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  visited: {
    type: Number,
    default: 0,
  },
  liked: {
    type: Number,
    default: 0,
  },
  photoHero: {
    type: String,
    default: "no-photo.jpg",
  },
  gallery: {
    type: [String],
    default: [],
  },
  content: {
    type: [Section],
    required: [true, "Post should have a body"],
  },
  searchBy: {
    type: [String],
    required: [true, "Post should contain search strings"],
  },
});

module.exports = mongoose.model("Post", PostSchema);
