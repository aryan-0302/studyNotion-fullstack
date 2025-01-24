import express from "express"
const app=express();

import userRoutes from "./routes/User.js"
import paymentRoutes from "./routes/Payment.js"
import profileRoutes from "./routes/Profile.js"
import CourseRoutes from "./routes/Course.js"

import dbConnect from "./config/db.js"

import cookieParser from "cookie-parser";
import cors from "cors"
import fileUpload from "express-fileupload"
import cloudinaryconnect from "./config/Cloudinary.js"


import dotenv from "dotenv"
dotenv.config();

const PORT = process.env.PORT || 5000;
dbConnect();

app.use(express.json());

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:3000", 
];

app.use(cors({
  origin: allowedOrigins, 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  credentials: true 
}));



app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:'/tmp/'
}));

cloudinaryconnect();
  

app.use("/api/v1/auth", userRoutes); 
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", CourseRoutes);


app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
  });
});
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
