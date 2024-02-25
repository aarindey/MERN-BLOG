const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const validateTokenController = require("../controllers/validateTokenController");

router.post("/me", authMiddleware, validateTokenController);

module.exports = router;
