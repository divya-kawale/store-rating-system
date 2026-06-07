// const db = require("../config/db");
// const bcrypt = require("bcrypt");

// const getDashboard = (req, res) => {
//   const dashboardData = {};

//   db.query(
//     "SELECT COUNT(*) AS totalUsers FROM users",
//     (err, usersResult) => {
//       if (err) return res.status(500).json(err);

//       dashboardData.totalUsers =
//         usersResult[0].totalUsers;

//       db.query(
//         "SELECT COUNT(*) AS totalStores FROM stores",
//         (err, storesResult) => {
//           if (err) return res.status(500).json(err);

//           dashboardData.totalStores =
//             storesResult[0].totalStores;

//           db.query(
//             "SELECT COUNT(*) AS totalRatings FROM ratings",
//             (err, ratingsResult) => {
//               if (err)
//                 return res.status(500).json(err);

//               dashboardData.totalRatings =
//                 ratingsResult[0].totalRatings;

//               res.json(dashboardData);
//             }
//           );
//         }
//       );
//     }
//   );
// };

// const getAllUsers = (req, res) => {
//   db.query(
//     "SELECT id, name, email, address, role FROM users",
//     (err, result) => {
//       if (err) return res.status(500).json(err);

//       res.json(result);
//     }
//   );
// };


// const createUser = (req, res) => {
//   const { name, email, password, address, role } = req.body;

//   db.query(
//     "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
//     [name, email, password, address, role],
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       res.json({ message: "User created successfully" });
//     }
//   );
// };

// const createStore = (req, res) => {
//   const { name, email, address } = req.body;

//   db.query(
//     "INSERT INTO stores (name, email, address) VALUES (?, ?, ?)",
//     [name, email, address],
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       res.json({ message: "Store created successfully" });
//     }
//   );
// };

// module.exports = {
//   getDashboard,
//   getAllUsers,
//   createUser,
//   createStore
// };

const db = require("../config/db");
const bcrypt = require("bcrypt");

// ---------------- DASHBOARD ----------------
const getDashboard = (req, res) => {
  const dashboardData = {};

  db.query(
    "SELECT COUNT(*) AS totalUsers FROM users",
    (err, usersResult) => {
      if (err) return res.status(500).json(err);

      dashboardData.totalUsers = usersResult[0].totalUsers;

      db.query(
        "SELECT COUNT(*) AS totalStores FROM stores",
        (err, storesResult) => {
          if (err) return res.status(500).json(err);

          dashboardData.totalStores =
            storesResult[0].totalStores;

          db.query(
            "SELECT COUNT(*) AS totalRatings FROM ratings",
            (err, ratingsResult) => {
              if (err) return res.status(500).json(err);

              dashboardData.totalRatings =
                ratingsResult[0].totalRatings;

              res.json(dashboardData);
            }
          );
        }
      );
    }
  );
};

// ---------------- GET ALL USERS ----------------
const getAllUsers = (req, res) => {
  db.query(
    "SELECT id, name, email, address, role FROM users",
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    }
  );
};

// ---------------- CREATE USER ----------------
const createUser = (req, res) => {
  const { name, email, password, address, role } = req.body;

  // Check if email already exists
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 10);

      db.query(
        "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
        [name, email, hashedPassword, address, role],
        (err2, result2) => {
          if (err2) return res.status(500).json(err2);

          res.json({
            message: "User created successfully",
          });
        }
      );
    }
  );
};

// ---------------- CREATE STORE ----------------
const createStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  console.log("STORE DATA RECEIVED:", req.body); // DEBUG

  // validation
  if (!name || !email || !address) {
    return res.status(400).json({ message: "Missing store fields" });
  }

  // allow NULL owner_id if not selected
  const finalOwnerId = owner_id ? Number(owner_id) : null;

  const sql =
    "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [name, email, address, finalOwnerId],
    (err, result) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.status(500).json({
          message: err.sqlMessage || err.message,
        });
      }

      res.json({
        message: "Store created successfully",
      });
    }
  );
};
module.exports = {
  getDashboard,
  getAllUsers,
  createUser,
  createStore,
};