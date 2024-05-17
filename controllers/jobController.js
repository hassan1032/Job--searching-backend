import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { job } from "../models/jobSchema.js";
// Get All Job Employer 
export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await job.find({
    expired: false,
  });
  res.status(200).json({
    success: true,
    jobs,
  });
});

// Create A New Job For Employer only 
export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
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

// Get Job For Empolyer 
export const getmyJobs = catchAsyncError(async(req,res,next)=>{
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const myJobs = await job.find({jobPostedby: req.user._id})
  res.status(200).json({
    success: true,
    myJobs,
  
  })
   
})


// Update For Job 
export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let jobs = await job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  jobs = await job.findByIdAndUpdate(id, req.body, {
    new: true,
     runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job Updated Successfully!",
    jobs,
  });
});


export const deletejob = catchAsyncError(async(req,res,next)=>{
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)

    )
  }
  const { id } = req.params;
  let jobs = await job.findById(id);
  if (!jobs) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
    }
    jobs = await job.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Job Deleted Successfully!",
      jobs,
    })
})

