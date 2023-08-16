const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

async function seed() {
    const client = await pool.connect();

    let result;

    try {
        await client.query("BEGIN");

        await client.query('DELETE FROM users WHERE email != $1', ['haroon@gmail.com']);
        await client.query('TRUNCATE TABLE products RESTART IDENTITY');
        await client.query('TRUNCATE TABLE orders RESTART IDENTITY');

        await client.query("INSERT INTO products (u_id, p_id, name, price, quantity) VALUES($1, $2, $3, $4, $5)", [
            1,
            'MdJ75dGaZ5',
            'Bag',
            1.39,
            5
        ]);

        await client.query("INSERT INTO orders (u_id, date, cart, total) VALUES($1, $2, $3, $4)", [
            1,
            '2023-07-14',
            JSON.stringify([{ "pId": "feLJBMAzEK", "name": "Bag", "price": 1.39, "quantity": 2 }]),
            2.78
        ]);

        await client.query("COMMIT");

        result = "ok";
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(error);
        result = "error";
    } finally {
        client.release();
        return result;
    }
}

module.exports.seed = seed;