import express from "express";
import {
    employerGetAllApplications,
    jobseekerGetAllApplications,
    jobseekerDeleteApplication,
    postApplication,
} from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";
const router = express.Router();

router.get("/jobseeker/getall", isAuthorized, jobseekerGetAllApplications);
router.get("/employer/getall", isAuthorized, employerGetAllApplications);
router.delete("/delete/:id", isAuthorized, jobseekerDeleteApplication);
router.post("/post",isAuthorized,postApplication);

export default router;
