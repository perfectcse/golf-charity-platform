const Score = require("../models/Score");

// Add Score (with 5 score rolling logic)
exports.addScore = async (req, res) => {
  try {
    const { userId, score } = req.body;

    if (!userId || !score) {
      return res.status(400).json({
        message: "User ID and score are required",
      });
    }

    if (score < 1 || score > 45) {
      return res.status(400).json({
        message: "Score must be between 1 and 45",
      });
    }

    // Get user's scores sorted oldest first
    const scores = await Score.find({ user: userId }).sort({ createdAt: 1 });

    // If already 5 scores → delete oldest
    if (scores.length >= 5) {
      await Score.findByIdAndDelete(scores[0]._id);
    }

    // Add new score
    const newScore = await Score.create({
      user: userId,
      score,
    });

    res.json({
      message: "Score added successfully",
      newScore,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User Scores (latest first)
exports.getScores = async (req, res) => {
  try {
    const { userId } = req.params;

    const scores = await Score.find({ user: userId }).sort({ createdAt: -1 });

    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};