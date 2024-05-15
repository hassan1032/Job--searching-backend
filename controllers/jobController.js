import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { job } from "../models/jobSchema.js";

export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await job.find({
    expired: false,
  });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  // console.log("postjob", req.user);

  if (role !== "admin") {
    return next(
      new ErrorHandler("You are not authorized to perform this action", 403)
    );
  }
  const {
    title,
    company,
    description,
    catagerory,
    country,
    city,
    location,
    fixedsalary,
    salaryfrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !catagerory || !country || !city || !location||!company) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  if ((!salaryfrom || !salaryTo) && !fixedsalary) {
    return next(
      new ErrorHandler(
        "Please either provide fixed salary or ranged salary.",
        400
      )
    );
  }

  if (salaryfrom && salaryTo && fixedsalary) {
    return next(
      new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
    );
  }
  const jobPostedby = req.user._id;
  const jobs = await job.create({
    title,
    company,
    description,
    catagerory,
    country,
    city,
    location,
    fixedsalary,
    salaryfrom,
    salaryTo,
    jobPostedby,
  });
  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    jobs,
  });
});
