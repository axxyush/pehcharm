export default User;

import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { email, password, name, username } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        message: "User with this username already exists",
      });
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const createdUser = new User({
      name: name,
      email: email,
      username: username,
      password: hashPassword,
    });

    await createdUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        name: createdUser.name,
        email: createdUser.email,
        username: createdUser.username,
        _id: createdUser._id,
      },
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid username or password " });
    } else {
      return res.status(200).json({
        message: "Login Successful ",
        user: {
          name: user.name,
          email: user.email,
          username: user.username,
          about: user.about,
          education: user.education,
          experience: user.experience,
          linkedin: user.linkedin,
          instagram: user.instagram,
          github: user.github,
          skills: user.skills,
          honors: user.honors,
          project: user.project,
          recommendation: user.recommendation,
          viewers: user.viewers,
          _id: user._id,
        },
      });
    }
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ message: "Internal Server Error " });
  }
};

// Update
export const update = async (req, res) => {
  try {
    const { email, ...updateData } = req.body;

    const user = await User.findOne({ email });

    Object.assign(user, updateData);

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        name: user.name,
        email: user.email,
        username: user.username,
        about: user.about,
        education: user.education,
        linkedin: user.linkedin,
        instagram: user.instagram,
        github: user.github,
        experience: user.experience,
        skills: user.skills,
        honors: user.honors,
        project: user.project,
        recommendation: user.recommendation,
        viewers: user.viewers,
        _id: user._id,
      },
    });
  } catch (error) {
    console.log("Error : ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// add viewer
export const addViewer = async (req, res) => {
  try {
    const { username } = req.params;
    const { viewer } = req.body;

    if (!viewer) {
      return res.status(400).json({ message: "Missing viewer username" });
    }

    if (viewer === username) {
      return res.status(400).json({ message: "Cannot add yourself as viewer" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.viewers.push(viewer);
    await user.save();

    return res.status(200).json({ viewers: user.viewers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE viewer
export const removeViewer = async (req, res) => {
  try {
    const { username, idx } = req.params;
    const index = parseInt(idx, 10);

    if (isNaN(index)) {
      return res.status(400).json({ message: "Invalid index" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (index < 0 || index >= user.viewers.length) {
      return res.status(400).json({ message: "Index out of range" });
    }

    user.viewers.splice(index, 1);
    await user.save();

    return res.status(200).json({ viewers: user.viewers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
