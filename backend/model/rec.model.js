import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
  toUser: { type: String, required: true },
  fromUser: { type: String, required: true },
  content: { type: String, required: true, trim: true, maxlength: 1000 },
  show: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['recommendation', 'request'], default: 'recommendation' },
});

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

export default Recommendation;
