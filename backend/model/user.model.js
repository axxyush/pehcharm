import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  clgname: String,
  degree: String,
  year: String,
  gpa: String,
  activities: String,
});

const experienceSchema = new mongoose.Schema({
  jobtitle: String,
  company: String,
  year: String,
  location: String,
  jobdescription: String,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  about: String,
  education: [educationSchema],
  linkedin: String,
  instagram: String,
  github: String,
  experience: [experienceSchema],
  skills: [String],
  honors: String,
});

const User = mongoose.model("User", userSchema);

export default User;
