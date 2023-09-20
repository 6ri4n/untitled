const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add an email address"],
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, "Please create a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please create a password"],
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
