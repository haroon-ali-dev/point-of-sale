const validate = require("./validations/users");
const pool = require("./db/db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  try {
    const rs = await pool.query("SELECT * FROM users WHERE email = $1", [req.body.email]);
    if (rs.rowCount > 0) return res.status(400).json({ message: "User already registered." });

    res.send("ok");
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
