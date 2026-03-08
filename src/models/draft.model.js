import mongoose from "mongoose";

const draftSchema = new mongoose.Schema(
  {
    title: {type: String},
    content: {type: String},
    mood: {type: String},
    userId: {type: String, required: true, unique: true},
  },
  {timestamps: true},
);

export default mongoose.models.Draft || mongoose.model("Draft", draftSchema);
