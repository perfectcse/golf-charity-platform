const express = require("express");
const router = express.Router();

const { runDraw, getDraws } = require("../controllers/drawController");

router.post("/run", runDraw);
router.get("/", getDraws);

module.exports = router;