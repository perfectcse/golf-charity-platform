const express = require("express");
const router = express.Router();

const { updateSubscription, getUserById } = require("../controllers/userController");

router.put("/subscription", updateSubscription);
router.get("/:id", getUserById);

module.exports = router;