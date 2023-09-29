const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user");

const signupValidUsername = asyncHandler(async (req, res) => {
  const { username } = req.body;

  if (!username) {
    res.status(400);
    throw new Error("Username is missing.");
  }

  const checkUsername = await User.findOne({ username });

  if (checkUsername) {
    res.status(400);
    throw new Error("Username not available.");
  }

  res.status(200).json({ message: "Username available." });
});

module.exports = signupValidUsername;
