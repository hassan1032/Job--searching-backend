import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import { User } from "../models/user.js";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
  const { authorization } = req.cookies;
  if (!authorization) {
    return next(new ErrorHandler("User are not authorized", 401));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET_key);
  req.user = await User.findById(decoded.id);
  next();
});
