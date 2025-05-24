import Recommendation from "../model/rec.model.js";

// POST
export const createRecommendation = async (req, res) => {
  try {
    const { toUser, fromUser, content } = req.body;
    const rec = await Recommendation.create({ toUser, fromUser, content });
    return res.status(201).json(rec);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET
export const getRecommendations = async (req, res) => {
  try {
    const { toUser, status } = req.query;
    const filter = { toUser };
    if (status) filter.show = status === "approved";
    const recs = await Recommendation.find(filter).sort({ date: -1 });
    return res.json(recs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// PATCH update
export const updateRecommendation = async (req, res) => {
  try {
    const { id } = req.params;
    const { show } = req.body;
    const rec = await Recommendation.findById(id);
    if (!rec) return res.status(404).json({ message: "Not found" });
    rec.show = show;
    await rec.save();
    return res.json(rec);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteRecommendation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRec = await Recommendation.findByIdAndDelete(id);
    
    if (!deletedRec) {
      return res.status(404).json({ message: "Recommendation not found" });
    }
    
    res.status(200).json({ message: "Recommendation deleted successfully" });
  } catch (error) {
    console.error("Error deleting recommendation:", error);
    res.status(500).json({ message: "Error deleting recommendation" });
  }
};
