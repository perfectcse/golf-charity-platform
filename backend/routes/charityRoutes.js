const express = require("express");
const router = express.Router();

const {
  createCharity,
  getCharities,
  seedCharities,
  selectCharity,
} = require("../controllers/charityController");

router.post("/", createCharity);
router.get("/", getCharities);
router.post("/seed", seedCharities);
router.post("/select", selectCharity);

module.exports = router;