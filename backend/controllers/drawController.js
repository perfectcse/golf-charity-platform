const Draw = require("../models/Draw");
const Score = require("../models/Score");
const Winner = require("../models/Winner");

// Run Draw
exports.runDraw = async (req, res) => {
  try {
    // Generate 5 random numbers
    const generateNumbers = () => {
      let numbers = [];
      while (numbers.length < 5) {
        let num = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(num)) numbers.push(num);
      }
      return numbers;
    };

    const numbers = generateNumbers();

    // Save draw
    const draw = await Draw.create({ numbers });

    // Get all scores
    const scores = await Score.find();

    // Group scores by user
    let userScores = {};

    scores.forEach((s) => {
      const userId = s.user.toString();
      if (!userScores[userId]) userScores[userId] = [];
      userScores[userId].push(s.score);
    });

    // Check matches for each user
    for (let userId in userScores) {
      const userScoreArray = userScores[userId];

      const matches = userScoreArray.filter((score) =>
        numbers.includes(score)
      ).length;

      console.log("User:", userId);
      console.log("User Scores:", userScoreArray);
      console.log("Draw Numbers:", numbers);
      console.log("Matches:", matches);

      // Create winner if match >= 3
      if (matches >= 3) {
        // Prevent duplicate winner for same draw
        const existingWinner = await Winner.findOne({
          user: userId,
          draw: draw._id,
        });

        if (!existingWinner) {
          await Winner.create({
            user: userId,
            draw: draw._id,
            matchCount: matches,
            paymentStatus: "Pending",
          });
        }
      }
    }

    res.json({
      message: "Draw completed",
      numbers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Draw Results
exports.getDraws = async (req, res) => {
  try {
    const draws = await Draw.find().sort({ createdAt: -1 });
    res.json(draws);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};