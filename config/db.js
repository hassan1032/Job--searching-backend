import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URL,{
    dbName: "Job_App"
  }).then(()=>{
    console.log("MongoDB Connected")
  }).catch((err)=>{
    console.log(`MongoDB Connection Failed${err}`)
  })
  
}

export default connectDB;
