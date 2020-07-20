const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  header: {
    type: String,
    maxlength: [150, "Section Header can't be more than 150 characters"],
  },
  content: {
    type: String,
    required: [true, "Section cnanot be empty"],
  },
  image: String,
  imgDescription: {
    type: String,
    maxlength: [100, "Image Description can't be more than 150 characters"],
  },
  video: String,
  videoDescription: {
    type: String,
    maxlength: [100, "Video Description can't be more than 150 characters"],
  },
});

module.exports = SectionSchema;
