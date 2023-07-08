CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    u_id INT NOT NULL,
    cart jsonb NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY(u_id) 
	      REFERENCES users(id)
)