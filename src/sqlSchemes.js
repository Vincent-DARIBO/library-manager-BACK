export const customerScheme = `
CREATE TABLE customers (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50),
    phone VARCHAR(50)
);


`
export const ordersScheme = `
CREATE TABLE orders (
  customer_id INT,
  quantity INT,
  status INT,
  publication_id INT;
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (publication_id) REFERENCES pubs(id)
);
`

const pubs = `
CREATE TABLE orders (
  id INT,
  title va50)
  );