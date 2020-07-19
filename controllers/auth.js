const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// Register a user
// api/auth/register

module.exports.register = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
