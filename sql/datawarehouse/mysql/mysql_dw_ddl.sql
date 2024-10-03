DROP TABLE IF EXISTS fact_table;
DROP TABLE IF EXISTS dim_time;
DROP TABLE IF EXISTS dim_products;
DROP TABLE IF EXISTS dim_addresses;
DROP TABLE IF EXISTS dim_customers;

CREATE TABLE IF NOT EXISTS dim_time
(
    time_id int AUTO_INCREMENT PRIMARY KEY,
    date    datetime NOT NULL,
    year    int      NOT NULL,
    month   int      NOT NULL,
    day     int      NOT NULL,
    quarter int      NOT NULL,
    weekday int      NOT NULL,
    yearday int      NOT NULL
);

CREATE TABLE IF NOT EXISTS dim_products
(
    product_id   int AUTO_INCREMENT PRIMARY KEY,
    product_name varchar(40) NOT NULL,
    price        decimal(7, 2)
);

CREATE TABLE IF NOT EXISTS dim_addresses
(
    address_id int AUTO_INCREMENT PRIMARY KEY,
    country    varchar(40) NOT NULL,
    city       varchar(40) NOT NULL,
    street     varchar(40) NOT NULL,
    zip        char(6)     NOT NULL
);

CREATE TABLE IF NOT EXISTS dim_customers
(
    customer_id   int AUTO_INCREMENT PRIMARY KEY,
    first_name    varchar(40) NOT NULL,
    last_name     varchar(40) NOT NULL,
    phone         varchar(16) NOT NULL,
    email         varchar(40),
    date_of_birth date
);


CREATE TABLE IF NOT EXISTS fact_table
(
    order_id         int           NOT NULL,
    time_id          int           NOT NULL,
    address_id       int           NOT NULL,
    customer_id      int           NOT NULL,
    product_id       int           NOT NULL,
    product_quantity int           NOT NULL,
    sub_price        decimal(7, 2) NOT NULL,
    total_price      decimal(7, 2) NOT NULL,
    PRIMARY KEY (order_id, time_id, address_id, customer_id, product_id),
    FOREIGN KEY (time_id) REFERENCES dim_time (time_id),
    FOREIGN KEY (address_id) REFERENCES dim_addresses (address_id),
    FOREIGN KEY (customer_id) REFERENCES dim_customers (customer_id),
    FOREIGN KEY (product_id) REFERENCES dim_products (product_id)
);

CREATE UNIQUE INDEX idx_dim_ime ON dim_time (time_id);
CREATE UNIQUE INDEX idx_dim_products ON dim_products (product_id);
CREATE UNIQUE INDEX idx_dim_addresses ON dim_addresses (address_id);
CREATE UNIQUE INDEX idx_dim_customers ON dim_customers (customer_id);
CREATE UNIQUE INDEX idx_fact_table ON fact_table (order_id, time_id, address_id, customer_id, product_id);
