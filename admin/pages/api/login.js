const validate = require("./validations/users");

export default function handler(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  res.status(200).json({ name: 'John Doe' })
}
