DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS mysql_ds.products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS addresses;

CREATE TABLE IF NOT EXISTS mysql_ds.products
(
    product_id   int AUTO_INCREMENT PRIMARY KEY,
    product_name varchar(40)   NOT NULL,
    price        decimal(7, 2) NOT NULL,
    CONSTRAINT unique_product UNIQUE (product_name, price)
);

CREATE TABLE IF NOT EXISTS customers
(
    customer_id   int AUTO_INCREMENT PRIMARY KEY,
    first_name    varchar(40) NOT NULL,
    last_name     varchar(40) NOT NULL,
    phone         varchar(16) NOT NULL,
    email         varchar(40) NOT NULL,
    date_of_birth date,
    city          varchar(40) NOT NULL,
    street        varchar(40) NOT NULL,
    zip           varchar(6)  NOT NULL,
    CONSTRAINT unique_customer UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS addresses
(
    address_id int AUTO_INCREMENT PRIMARY KEY,
    country    varchar(40) NOT NULL,
    city       varchar(40) NOT NULL,
    street     varchar(40) NOT NULL,
    zip        char(6)     NOT NULL,
    CONSTRAINT unique_address UNIQUE (country, city, street, zip)
);

CREATE TABLE IF NOT EXISTS orders
(
    order_id    int AUTO_INCREMENT PRIMARY KEY,
    customer_id int,
    address_id  int,
    order_date  datetime          NOT NULL,
    total_price decimal(7, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id),
    FOREIGN KEY (address_id) REFERENCES addresses (address_id)
);

CREATE TABLE IF NOT EXISTS order_items
(
    order_item_id int AUTO_INCREMENT PRIMARY KEY,
    order_id      int,
    product_id    int,
    quantity      int           NOT NULL,
    sub_price     decimal(7, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE UNIQUE INDEX idx_product_id ON products (product_id);
CREATE UNIQUE INDEX idx_order_id ON orders (order_id);
CREATE UNIQUE INDEX idx_customer_id ON customers (customer_id);
CREATE UNIQUE INDEX idx_address_id ON addresses (address_id);
