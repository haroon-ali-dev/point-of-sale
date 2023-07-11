const validate = require("@/pages/api/validations/products");
const pool = require("@/pages/api/db/db");

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      let dbRes = await pool.query("SELECT * FROM orders WHERE id = $1", [+id]);
      if (dbRes.rowCount <= 0) return res.status(404).json({ message: "Order not found." });

      res.json(dbRes.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "Method not allowed."});
  }
}