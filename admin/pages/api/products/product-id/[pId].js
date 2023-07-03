const pool = require("@/pages/api/db/db");

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { pId } = req.query;

            let dbRes = await pool.query("SELECT * FROM products WHERE p_id = $1", [pId]);
            if (dbRes.rowCount <= 0) return res.status(404).json({ message: "Product not found." });

            res.json(dbRes.rows[0]);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(500).json({ message: "Method not allowed." });
    }
}