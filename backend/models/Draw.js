const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema(
  {
    numbers: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Draw || mongoose.model("Draw", drawSchema);