import app from "./app.js";
import cloudinary from "cloudinary";
import connectDB from "./config/db.js";
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("Server is started..");
    });
  })
  .catch((err) => {
    console.log("Error while connecting to db..");
    console.log(err);
  });
