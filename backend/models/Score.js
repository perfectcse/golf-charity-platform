const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 45,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Score || mongoose.model("Score", scoreSchema);