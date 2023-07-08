CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    u_id INT NOT NULL,
    p_id VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    price NUMERIC(6, 2) NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY(u_id) 
	      REFERENCES users(id)
)