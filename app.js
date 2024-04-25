import express from "express";
// import dotenv from "dotenv";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import applicationRouter from "./routes/applicationRouter.js";

import jobRouter from "./routes/jobRouter.js";

import userRouter from "./routes/userRouter.js";

const app = express();
// dotenv.config({path: './config/config.env'})
config({ path: "./config/config.env" });
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET ", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

export default app;
