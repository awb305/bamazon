DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon; 

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(45) NOT NULL,
	deparment_name VARCHAR(45) NOT NULL, 
	price DECIMAL(10,3) NOT NULL,
	stock_quantity INT default 0,
	PRIMARY KEY (item_id)

);

SELECT * FROM products; 


INSERT INTO products ( product_name, deparment_name, price, stock_quantity)
VALUES ('baseball', 'sports', '3.00', '100'),
('basketball', 'sports', '30.00', '50'),
('football', 'sports', '30.00', '50'),
('pot', 'kitchen', '50.00', '20'),
('spatula', 'kitchen', '12.00', '100'),
('knives', 'kitchen', '20.00', '45'),
('crock pot', 'kitchen', '20.00', '30'),
('lawnmover','lawn & garden', '200.00', '30'),
('weber grill', 'lawn & garden', '200.00', '30'),
('patio seating', 'lawn & garden', '200.00', '10');

