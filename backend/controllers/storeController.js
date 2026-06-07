// const db = require("../config/db");

// const addStore = (req, res) => {
//   const { name, email, address, owner_id } = req.body;

//   const sql =
//     "INSERT INTO stores(name,email,address,owner_id) VALUES(?,?,?,?)";

//   db.query(
//     sql,
//     [name, email, address, owner_id],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({
//           message: err.message
//         });
//       }

//       res.status(201).json({
//         message: "Store Added Successfully"
//       });
//     }
//   );
// };

// const getAllStores = (req, res) => {
//   const userId = req.user.id;

//   const sql = `
//     SELECT 
//       s.id,
//       s.name,
//       s.email,
//       s.address,

//       ROUND(IFNULL(AVG(r.rating), 0)) AS average_rating,

//       ur.rating AS user_rating

//     FROM stores s
//     LEFT JOIN ratings r ON s.id = r.store_id
//     LEFT JOIN ratings ur 
//       ON s.id = ur.store_id AND ur.user_id = ?

//     GROUP BY s.id, ur.rating
//   `;

//   db.query(sql, [userId], (err, result) => {
//     if (err) {
//       return res.status(500).json({
//         message: err.message
//       });
//     }

//     res.json(result);
//   });
// };

// module.exports = {
//   addStore,
//   getAllStores
// };


const db = require("../config/db");

// ---------------- ADD STORE ----------------
const addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  console.log("STORE RECEIVED", req.body);

  const finalOwnerId = owner_id ? Number(owner_id) : null;

  const sql =
    "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, address, finalOwnerId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.status(201).json({
      message: "Store Added Successfully",
    });
  });
};

// ---------------- GET ALL STORES ----------------
const getAllStores = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      s.id,
      s.name,
      s.email,
      s.address,

      IFNULL(ROUND(AVG(r.rating), 1), 0) AS average_rating,

      (
        SELECT rating 
        FROM ratings 
        WHERE store_id = s.id AND user_id = ?
        LIMIT 1
      ) AS user_rating

    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    GROUP BY s.id, s.name, s.email, s.address
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.json(result);
  });
};

module.exports = {
  addStore,
  getAllStores,
};