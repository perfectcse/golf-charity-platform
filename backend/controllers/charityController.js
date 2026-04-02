const Charity = require("../models/Charity");
const User = require("../models/User");

// Create Charity
exports.createCharity = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const charity = await Charity.create({
      name,
      description,
      image,
    });

    res.json(charity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Charities
exports.getCharities = async (req, res) => {
  try {
    const charities = await Charity.find();
    res.json(charities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Seed Default Charities
exports.seedCharities = async (req, res) => {
  try {
    const existing = await Charity.find();

    if (existing.length > 0) {
      return res.json({ message: "Charities already exist" });
    }

    const charities = [
      {
        name: "Red Cross",
        description: "Provides emergency assistance and disaster relief",
        image: "",
      },
      {
        name: "UNICEF",
        description: "Works for children's rights and protection",
        image: "",
      },
      {
        name: "Save the Children",
        description: "Improves children's lives worldwide",
        image: "",
      },
      {
        name: "WWF",
        description: "Wildlife and environment protection",
        image: "",
      },
    ];

    await Charity.insertMany(charities);

    res.json({ message: "Default charities added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Select Charity (IMPORTANT)
exports.selectCharity = async (req, res) => {
  try {
    const { userId, charityName } = req.body;

    if (!userId || !charityName) {
      return res.status(400).json({
        message: "User ID and Charity Name required",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { charity: charityName },
      { new: true }
    );

    res.json({
      message: "Charity selected successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};