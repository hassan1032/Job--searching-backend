import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import { sendToken } from "../utils/jwtToken.js";

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

    sendToken(user, 201, res, "User Registered SuccessFully");
  } catch (err) {
    next(err);
  }
});

// Login
export const login = catchAsyncError(async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return next(
        new ErrorHandler("Please Provide email, password, and role.", 400)
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    if (user.role !== role) {
      return next(new ErrorHandler("User with this role not found", 401));
    }

    sendToken(user, 200, res, "User Login Successfully");
  } catch (error) {
    next(error);
  }
});

export const logout = catchAsyncError(async(req,res,next)=>{
    try {
        res.cookie("token",null,{
            expires:new Date(Date.now()+1000*10),
            httpOnly:true
            })
            res.status(200).json({
                success:true,
                message:"Logged out successfully"
                })
            }catch(error){
                next(error)
            }      
 

})
