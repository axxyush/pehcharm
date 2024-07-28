import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./route/user.route.js";
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.URI;

// Connect to MongoDB
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });

//Defining routes
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Pehcharm listening on port ${PORT}`);
});
