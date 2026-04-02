const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const charityRoutes = require("./routes/charityRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const drawRoutes = require("./routes/drawRoutes");
const winnerRoutes = require("./routes/winnerRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/charities", charityRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/draw", drawRoutes);
app.use("/api/winners", winnerRoutes);
app.use("/api/users", userRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});