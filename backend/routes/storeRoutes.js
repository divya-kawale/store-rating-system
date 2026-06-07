const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const { addStore,getAllStores } =
  require("../controllers/storeController");

router.post(
  "/add",
  authMiddleware,
  roleMiddleware("ADMIN"),
  addStore
);

router.get(
  "/all",
  authMiddleware,
  getAllStores
);

module.exports = router;