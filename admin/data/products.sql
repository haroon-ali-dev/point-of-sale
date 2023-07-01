CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price NUMERIC(4, 2),
    quantity INT
)