const pool = require("@/pages/api/db/db");

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
        const { uId } = req.query;

        const dbRes = await pool.query("SELECT * FROM orders WHERE u_id = $1 ORDER BY id DESC", [+uId]);
  
        res.json(dbRes.rows);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  } else {
    res.status(500).json({ message: "Method not allowed."});
  }
}