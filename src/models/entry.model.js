import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    content: {type: String},
    mood: {type: String},
    moodScore: {type: Number},
    moodImageUrl: {type: String},
    collectionId: {type: String},
    userId: {type: String, required: true},
  },
  {timestamps: true},
);

const Entry = mongoose.models.Entry || mongoose.model("Entry", entrySchema);
export default Entry;
