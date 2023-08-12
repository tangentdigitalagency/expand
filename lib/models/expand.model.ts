import mongoose from "mongoose";

const expandSchema = new mongoose.Schema({

  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expand", // this allows for recursive population
    }
  ]
  
})

const Expand = mongoose.models.Expand || mongoose.model("Expand", expandSchema);

export default Expand;