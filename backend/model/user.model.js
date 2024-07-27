import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  about: {
    type: String,
  },
  clgname: {
    type: String,
  },
  degree: {
    type: String,
  },
  gpa: {
    type: String,
  },
  activities: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  instagram: {
    type: String,
  },
  github: {
    type: String,
  },
  x: {
    type: String,
  },
  jobtitle: {
    type: String,
  },
  company: {
    type: String,
  },
  location: {
    type: String,
  },
  jobdescription: {
    type: String,
  },
  otherexperiences: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
