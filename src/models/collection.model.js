import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    description: {type: String},
    userId: {type: String, required: true},
  },
  {timestamps: true},
);

export default mongoose.models.Collection ||
  mongoose.model("Collection", collectionSchema);
