const express = require("express");
const router = express.Router();
const {
  getWinners,
  uploadProof,
  verifyWinner,
} = require("../controllers/winnerController");

router.get("/", getWinners);
router.post("/upload-proof", uploadProof);
router.post("/verify", verifyWinner);

module.exports = router;