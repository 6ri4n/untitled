const asyncHandler = require("../utils/asyncHandler");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const signupUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !password || !username) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const checkEmail = await User.findOne({ email });
  const checkUsername = await User.findOne({ username });

  if (checkEmail) {
    res.status(400);
    throw new Error("Email not available.");
  }

  if (checkUsername) {
    res.status(400);
    throw new Error("Username not available.");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "Successfully created an account." });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

module.exports = signupUser;
