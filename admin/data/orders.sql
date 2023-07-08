CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    u_id INT NOT NULL,
    date DATE NOT NULL,
    cart jsonb NOT NULL,
    total NUMERIC(6, 2) NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY(u_id) 
	      REFERENCES users(id)
)