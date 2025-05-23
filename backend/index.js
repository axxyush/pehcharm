import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./route/user.route.js";
import blogRoute from "./route/blog.route.js";
import recommendationRoute from "./route/rec.route.js";
// import recommendationRoute from "./route/rec.route.js";

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });

//Defining routes
app.use("/user", userRoute);
app.use("/blogs", blogRoute);
app.use("/recommendations", recommendationRoute);

app.listen(PORT, () => {
  console.log(`Pehcharm listening on port ${PORT}`);
});
