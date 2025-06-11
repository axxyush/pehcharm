import express from "express";
import {
  createRecommendation,
  getRecommendations,
  updateRecommendation,
  deleteRecommendation,
  requestRecommendation,
} from "../controller/rec.controller.js";

const router = express.Router();

// Create
router.post("/addrec", createRecommendation);

// Request Recommendation
router.post("/requestrec", requestRecommendation);

// List
router.get("/getrec", getRecommendations);

// Approve / Reject
router.patch("/:id", updateRecommendation);

// Delete
router.delete("/:id", deleteRecommendation);

export default router;
