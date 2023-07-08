const validate = require("../validations/orders");
const pool = require("../db/db");

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    res.send("ok");

    // try {
    //   const p_Id = nanoid(10);

    //   const dbRes = await pool.query("INSERT INTO products (u_id, p_id, name, price, quantity) VALUES($1, $2, $3, $4, $5) RETURNING *", [
    //     req.body.uId,
    //     p_Id,
    //     req.body.name,
    //     req.body.price,
    //     req.body.quantity
    //   ]);

    //   res.json(dbRes.rows[0]);
    // } catch (error) {
    //   res.status(500).json({ message: error.message });
    // }
  } else {
    res.status(500).json({ message: "Method not allowed."});
  }
}