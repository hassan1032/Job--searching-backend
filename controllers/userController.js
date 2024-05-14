import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";

export const register = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;
    if (!name || !email || !phone || !password || !role) {
      throw new ErrorHandler("Please Fill all fields For Registration", 400);
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
      throw new ErrorHandler("Email Already Exists", 400);
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      phone,
    });

    res.status(200).json({
      success: true,
      user,
      message: "User Registered Successfully",
    });
  } catch (err) {
    next(err);
  }
});
