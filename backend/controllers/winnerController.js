const Winner = require("../models/Winner");

// Get Winners
exports.getWinners = async (req, res) => {
  try {
    const winners = await Winner.find()
      .populate("user", "name email")
      .populate("draw");

    res.json(winners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload Payment Proof
exports.uploadProof = async (req, res) => {
  try {
    const { winnerId, proofImage } = req.body;

    if (!winnerId || !proofImage) {
      return res.status(400).json({
        message: "Winner ID and proof image required",
      });
    }

    const winner = await Winner.findByIdAndUpdate(
      winnerId,
      { proofImage },
      { new: true }
    );

    if (!winner) {
      return res.status(404).json({ message: "Winner not found" });
    }

    res.json({
      message: "Proof uploaded successfully",
      winner,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin Verify Winner
exports.verifyWinner = async (req, res) => {
  try {
    const { winnerId } = req.body;

    if (!winnerId) {
      return res.status(400).json({
        message: "Winner ID required",
      });
    }

    const winner = await Winner.findByIdAndUpdate(
      winnerId,
      { paymentStatus: "Paid" },
      { new: true }
    );

    if (!winner) {
      return res.status(404).json({ message: "Winner not found" });
    }

    res.json({
      message: "Winner payment verified",
      winner,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};