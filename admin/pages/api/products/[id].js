const validate = require("@/pages/api/validations/products");
const pool = require("@/pages/api/db/db");

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;

      const dbRes = await pool.query("SELECT * FROM products WHERE id = $1", [+id]);

      res.json(dbRes.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'PATCH') {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    try {
      const { id } = req.query;

      await pool.query("UPDATE products SET name = $1, price = $2, quantity = $3 WHERE id = $4", [
        req.body.name,
        req.body.price,
        req.body.quantity,
        +id
      ]);

      res.json({ message: "Product updated." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.send("Method not allowed.");
  }
}