const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  signup,
  login,
  updatePassword,
} = require("../controllers/authController");


router.post("/signup", signup);
router.post("/login", login);

router.put(
  "/update-password",
  authMiddleware,
  updatePassword
);

module.exports = router;