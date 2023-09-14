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
  status INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  customer_id INT,
  quantity INT,
  status INT DEFAULT 0,
  publication_id INT,
  global_order_id INT,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (publication_id) REFERENCES pubs(id),
  FOREIGN KEY (global_order_id) REFERENCES global_orders(id)
);



DELIMITER //

CREATE PROCEDURE DeleteOrderAndCheckGlobalOrder(
    IN orderId INT
)
BEGIN
    DECLARE globalOrderId INT;
    SELECT global_order_id INTO globalOrderId
    FROM orders
    WHERE id = orderId;
    
    DELETE FROM orders
    WHERE id = orderId;
    
    IF globalOrderId IS NOT NULL THEN
        DECLARE globalOrderCount INT;
        SELECT COUNT(*) INTO globalOrderCount
        FROM orders
        WHERE global_order_id = globalOrderId;

        IF globalOrderCount = 0 THEN
            DELETE FROM global_orders
            WHERE id = globalOrderId;
        END IF;
    END IF;
END;
//
DELIMITER ;
`