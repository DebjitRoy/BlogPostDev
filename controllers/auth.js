const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// Register a user
// api/auth/register

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });

    //Create Token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Login a user
// api/auth/login

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("Please provide Email & Password", 400));
    }

    // check user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid email or password", 401));
    }
    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid email or password", 401));
    }

    //Create Token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
