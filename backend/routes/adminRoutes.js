const express = require("express");
const router = express.Router();

const {
  getDashboard,
  getAllUsers,
  createUser,
  createStore
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/users", authMiddleware, roleMiddleware("ADMIN"), createUser);

router.post("/stores", authMiddleware, roleMiddleware("ADMIN"), createStore);

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getDashboard
//   (req, res) => {
//     res.json({
//       message: "Welcome Admin"
//     });
//   }

);

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAllUsers
);

module.exports = router;