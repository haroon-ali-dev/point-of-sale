const validate = require("./validations/users");
const pool = require("./db/db");
const bcrypt = require('bcrypt');

export default async function handler(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  try {
    const rs = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
    if (rs.rowCount <= 0) return res.status(400).json({ message: "Invalid email or password." });

    const validPassword = await bcrypt.compare(req.body.password, rs.rows[0].password);
    if (!validPassword) return res.status(400).send({ message: "Invalid email or password." });

    res.send("ok");
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
