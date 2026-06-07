const db = require("../config/db");

const getOwnerDashboard = (req, res) => {
  const ownerId = req.user.id;

  // Step 1: Get store of this owner
  const storeSql = `
    SELECT id FROM stores WHERE owner_id = ?
  `;

  db.query(storeSql, [ownerId], (err, storeResult) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (storeResult.length === 0) {
      return res.status(404).json({
        message: "Store not found for this owner"
      });
    }

    const storeId = storeResult[0].id;

    // Step 2: Average rating
    const avgSql = `
      SELECT ROUND(IFNULL(AVG(rating),0),2) AS average_rating
      FROM ratings WHERE store_id = ?
    `;

    db.query(avgSql, [storeId], (err, avgResult) => {
      if (err) return res.status(500).json(err);

      // Step 3: Users who rated
      const usersSql = `
        SELECT u.name, u.email, r.rating
        FROM ratings r
        JOIN users u ON r.user_id = u.id
        WHERE r.store_id = ?
      `;

      db.query(usersSql, [storeId], (err, usersResult) => {
        if (err) return res.status(500).json(err);

        res.json({
          average_rating: avgResult[0].average_rating,
          users: usersResult
        });
      });
    });
  });
};

module.exports = {
  getOwnerDashboard
};