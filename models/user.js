import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ` Please provide Your Name`],
    minlength: [3, `Name Must Contain At Least 3 Characters!`],
    maxlength: [30, `Name Cant'not exceed 30 Characters! `],
  },
  email: {
    type: String,
    required: [true, `Please provide Your Email`],
    unique: true,
    validate: [validator.isEmail, `Please provide a valid Email`],
  },
  phone: {
    type: Number,
    required: [true, `Please provide Your Phone Number`],
    minlength: [10, `Phone Number Must Contain At Least 10 Characters!`],
    maxlength: [11, `Phone Number Cant'not exceed 11 Characters! `],
  },
  password: {
    type: String,
    required: [true, `Please provide Your Password`],
    minlength: [8, `Password Must Contain At Least 8 Characters!`],
    select: false,
  },
  role: {
    type: String,
    required: [true, `Please provide Your Role`],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hasing The Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Comparing The Passwordd
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
// Creating JWT Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_key, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
