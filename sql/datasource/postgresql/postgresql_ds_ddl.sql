DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS addresses;

CREATE TABLE IF NOT EXISTS products
(
    product_id   serial PRIMARY KEY,
    product_name varchar(40)   NOT NULL,
    price        numeric(7, 2) NOT NULL,
    CONSTRAINT unique_product UNIQUE (product_name, price)
);

CREATE TABLE IF NOT EXISTS customers
(
    customer_id   serial PRIMARY KEY,
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
    address_id serial PRIMARY KEY,
    country    varchar(40) NOT NULL,
    city       varchar(40) NOT NULL,
    street     varchar(40) NOT NULL,
    zip        char(6)     NOT NULL,
    CONSTRAINT unique_address UNIQUE (country, city, street, zip)
);

CREATE TABLE IF NOT EXISTS orders
(
    order_id    serial PRIMARY KEY,
    customer_id integer REFERENCES customers (customer_id),
    address_id  integer REFERENCES addresses (address_id),
    order_date  timestamp          NOT NULL,
    total_price numeric(7, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items
(
    order_item_id serial PRIMARY KEY,
    order_id      integer REFERENCES orders (order_id),
    product_id    integer REFERENCES products (product_id),
    quantity      integer       NOT NULL,
    sub_price     numeric(7, 2) NOT NULL
);

CREATE UNIQUE INDEX ON products (product_id);
CREATE UNIQUE INDEX ON orders (order_id);
CREATE UNIQUE INDEX ON customers (customer_id);
CREATE UNIQUE INDEX ON addresses (address_id);
