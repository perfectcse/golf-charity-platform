const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    draw: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Draw",
    },
    matchCount: Number,
    proofImage: String,
    paymentStatus: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Winner || mongoose.model("Winner", winnerSchema);