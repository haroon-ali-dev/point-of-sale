const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const token = req.headers['x-auth-token'];
        if (!token) return res.status(400).json({ message: 'Access denied. No token provided.' });

        try {
            const decoded = jwt.verify(token, process.env.jwtPrivateKey);
            req.user = decoded;
            res.send("ok");
        }
        catch (ex) {
            return res.status(400).json({ message: 'Invalid token.' });
        }
    } else {
        res.send("Method not allowed.");
    }
}