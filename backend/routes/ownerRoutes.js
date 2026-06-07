const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getOwnerDashboard
} = require("../controllers/ownerController");

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("STORE_OWNER"),
  getOwnerDashboard
);

module.exports = router;