const pool = require("@/pages/api/db/db");

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
        const { id } = req.query;

        const dbRes = await pool.query("SELECT * FROM products WHERE id = $1", [+id]);
  
        res.json(dbRes.rows);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  } else {
    res.send("Method not allowed.");
  }
}