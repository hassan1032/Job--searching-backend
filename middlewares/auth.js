import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
  const token = req?.cookies?.token || req?.headers['authorization']?.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("User are not authorized", 401));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET_key);
  req.user = await User.findById(decoded.id);
  next();
});
