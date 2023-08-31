`
CREATE TABLE IF NOT EXISTS customers (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  phone VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS pubs (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS global_orders (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  status enum('NOT_SENT', 'SENT', 'RECEIVED', 'DELIVERED'),
  date VARCHAR(10)

);
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  customer_id INT,
  quantity INT,
  status enum('NOT_SENT', 'SENT', 'RECEIVED', 'DELIVERED'),
  publication_id INT,
  global_id INT,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (publication_id) REFERENCES pubs(id),
);


`