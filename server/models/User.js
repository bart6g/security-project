const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      max: 64,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      max: 64,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
