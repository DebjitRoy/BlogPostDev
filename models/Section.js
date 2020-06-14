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
});

module.exports = SectionSchema;
