CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    u_id INT,
    p_id VARCHAR(10) UNIQUE,
    name VARCHAR(50),
    price NUMERIC(6, 2),
    quantity INT,
    CONSTRAINT fk_user
      FOREIGN KEY(u_id) 
	  REFERENCES users(id)
)