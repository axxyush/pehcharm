import express from "express";
import {
  createRecommendation,
  getRecommendations,
  updateRecommendation,
} from "../controller/rec.controller.js";

const router = express.Router();

// Create
router.post("/addrec", createRecommendation);

// List
router.get("/getrec", getRecommendations);

// Approve / Reject
router.patch("/:id", updateRecommendation);

export default router;
