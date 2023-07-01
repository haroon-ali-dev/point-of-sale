const validate = require("./validations/products");
const pool = require("./db/db");

export default async function handler(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  res.send("ok");
}