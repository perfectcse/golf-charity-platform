const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    charity: String,
    charityPercentage: { type: Number, default: 10 },
    subscriptionStatus: { type: String, default: "inactive" },
    subscriptionPlan: String,
    subscriptionEndDate: Date,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);