DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    department_name VARCHAR(45) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);



INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("rasberryPi", 45.00, "Electronics", 50);

INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("iPad", 350.00, "Electronics", 50);

INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("Framing-Hammer", 25.00, "Hardware", 50);

INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("SnapOn-Ratchet-Set", 150.00, "Hardware", 50);

INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("Table Saw", 245.00, "Hardware", 50);

INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("12-pack-papertowels", 15.00, "Home", 50);

INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("Red Solo Cups  10pk", 7.00, "Home", 100);

INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("Leather Steering Wheel Cover", 25.00, "Auto", 50);

INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("Windshield Wipers", 20.00, "Auot", 50);

INSERT INTO products (product_name, price, department_name, stock_quantity)
VALUES ("Babe Ruth HR Ball", 500.00, "Sports", 2);



