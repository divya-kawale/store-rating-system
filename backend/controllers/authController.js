const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");

// ---------------- SIGNUP ----------------
const signup = (req, res) => {
  const { name, email, password, address } = req.body;

  // check email exists
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "DB error" });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      db.query(
        "INSERT INTO users (name,email,password,address,role) VALUES (?,?,?,?,?)",
        [name, email, hashedPassword, address, "USER"],
        (err2) => {
          if (err2) {
            return res.status(500).json({ message: "Insert error" });
          }

          res.status(201).json({
            message: "User registered successfully",
          });
        }
      );
    }
  );
};

// ---------------- LOGIN ----------------
const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "DB error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = result[0];

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login successful",
        token,
        role: user.role,
      });
    }
  );
};

// ---------------- UPDATE PASSWORD ----------------
const updatePassword = (req, res) => {
  const userId = req.user.id;

  const { oldPassword, newPassword } = req.body;

  db.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      const isMatch = bcrypt.compareSync(
        oldPassword,
        user.password
      );

      if (!isMatch) {
        return res.status(400).json({
          message: "Old password is incorrect",
        });
      }

      const hashedPassword = bcrypt.hashSync(
        newPassword,
        10
      );

      db.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashedPassword, userId],
        (err2) => {
          if (err2) {
            return res.status(500).json(err2);
          }

          res.json({
            message: "Password updated successfully",
          });
        }
      );
    }
  );
};

module.exports = { signup, login , updatePassword, };