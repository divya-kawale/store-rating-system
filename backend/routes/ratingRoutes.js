const express = require("express");
const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  submitRating, updateRating
} = require("../controllers/ratingController");


router.post(
  "/submit",
  authMiddleware,
  submitRating
);
router.put(
  "/update",
  authMiddleware,
  updateRating
);

module.exports = router;