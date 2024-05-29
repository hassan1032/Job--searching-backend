import mongoose from "mongoose";
import validator from "validator";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Provide job title"],
    minlength: [4, "job title must Contain at Least 4 characters!"],
    maxlength: [50, " Job Title canot exceed 50 characters!"],
  },
  description: {
    type: String,
    required: [true, "Please Provide job description"],
    minlength: [10, "job description must Contain at Least 10 characters!"],
    maxlength: [300, " Job Description canot exceed 300 characters!"],
  },
  catagerory: {
    type: String,
    required: [true, "Please Provide job catagerory"],
    minlength: [4, "job catagerory must Contain at Least 4 characters!"],
    maxlength: [50, " Job catagerory canot exceed 50 characters!"],
  },
  country: {
    type: String,
    required: [true, "Please Provide job country"],
  },
  city: {
    type: String,
    required: [true, "Please Provide job city"],
  },
  location: {
    type: String,
    required: [true, "Please Provide Exact  location"],
    minlength: [true, "job location Must conatin at least 25 charcters!"],
  },
  fixedsalary: {
    type: Number,
    // required: [true, "Please Provide job salary"],
    min: [5, " Fixed Salary must be greater than 5!"],
    max: [1000000, " Fixed Salary must be less than 1000000!"],
  },
  salaryfrom: {
    type: Number,
    // required: [true, "Please Provide job salary from"],
    min: [5, " Salary From must be greater than 5!"],
    max: [1000000, " Salary From must be less than 1000000!"],
  },
  salaryto: {
    type: Number,
    min: [5, "Salary to must Contain at least 5 digits!"],
    max: [100000, "Salary can not Exceed  100000 digits!"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  company: {
    type: String,
    required: [true, "Please Provide Company Name"],
  },
  jobPostedon: {
    type: Date,
    default: Date.now,
  },
  jobPostedby: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please Provide job Posted by"],
  },
});

export const job = mongoose.model("job", jobSchema);
