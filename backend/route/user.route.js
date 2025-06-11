import express from "express";
import {
  signup,
  login,
  update,
  addViewer,
  removeViewer,
} from "../controller/user.controller.js";
import { aiFeedback } from "../controller/ai.controller.js";
import User from "../model/user.model.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/update", update);
router.post("/:username/viewers", addViewer);
router.delete("/:username/viewers/:idx", removeViewer);
router.post("/:username/ai-feedback", aiFeedback);

// Route to get user data by username
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
