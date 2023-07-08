const validate = require("../validations/orders");
const pool = require("../db/db");
const moment = require("moment");

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { error } = validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        const date = moment().format("YYYY-MM-DD");

        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            await client.query("INSERT INTO orders (u_id, date, cart, total) VALUES($1, $2, $3, $4)", [
                req.body.uId,
                date,
                JSON.stringify(req.body.cart),
                req.body.total
            ]);

            for (let item of req.body.cart) {
                await client.query("UPDATE products SET quantity = (quantity - $1) WHERE p_id = $2", [item.quantity, item.pId]);
            }

            await client.query("COMMIT");

            res.json({ message: "Order created." });
        } catch (error) {
            await client.query('ROLLBACK');
            res.status(500).json({ message: error.message });
        } finally {
            client.release();
        }
    } else {
        res.status(500).json({ message: "Method not allowed." });
    }
}