const User = require("../models/User");

// Toggle Subscription
const updateSubscription = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.subscriptionStatus === "Active") {
      user.subscriptionStatus = "Inactive";
      user.subscriptionEndDate = null;
    } else {
      user.subscriptionStatus = "Active";

      // 30 days subscription
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);
      user.subscriptionEndDate = endDate;
    }

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating subscription" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "User not found" });
  }
};

module.exports = {
  updateSubscription,
  getUserById,
};