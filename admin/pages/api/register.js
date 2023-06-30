const validate = require("./validations/users");
const pool = require("./db/db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  res.send("ok");
}
