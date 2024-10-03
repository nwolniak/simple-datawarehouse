DROP TABLE IF EXISTS fact_table;
DROP TABLE IF EXISTS dim_time;
DROP TABLE IF EXISTS dim_products;
DROP TABLE IF EXISTS dim_addresses;
DROP TABLE IF EXISTS dim_customers;

CREATE TABLE IF NOT EXISTS dim_time
(
    time_id serial PRIMARY KEY,
    date    timestamp NOT NULL,
    year    integer   NOT NULL,
    month   integer   NOT NULL,
    day     integer   NOT NULL,
    quarter integer   NOT NULL,
    weekday integer   NOT NULL,
    yearday integer   NOT NULL
);

CREATE TABLE IF NOT EXISTS dim_products
(
    product_id   serial PRIMARY KEY,
    product_name varchar(40) NOT NULL,
    price        numeric(7, 2)
);

CREATE TABLE IF NOT EXISTS dim_addresses
(
    address_id serial PRIMARY KEY,
    country    varchar(40) NOT NULL,
    city       varchar(40) NOT NULL,
    street     varchar(40) NOT NULL,
    zip        char(6)     NOT NULL
);

CREATE TABLE IF NOT EXISTS dim_customers
(
    customer_id   serial PRIMARY KEY,
    first_name    varchar(40) NOT NULL,
    last_name     varchar(40) NOT NULL,
    phone         varchar(16) NOT NULL,
    email         varchar(40),
    date_of_birth date
);


CREATE TABLE IF NOT EXISTS fact_table
(
    order_id         integer       NOT NULL,
    time_id          integer REFERENCES dim_time (time_id),
    address_id       integer REFERENCES dim_addresses (address_id),
    customer_id      integer REFERENCES dim_customers (customer_id),
    product_id       integer REFERENCES dim_products (product_id),
    product_quantity integer       NOT NULL,
    sub_price        numeric(7, 2) NOT NULL,
    total_price      numeric(7, 2) NOT NULL,
    PRIMARY KEY (order_id, time_id, address_id, customer_id, product_id)
);

CREATE UNIQUE INDEX ON dim_time (time_id);
CREATE UNIQUE INDEX ON dim_products (product_id);
CREATE UNIQUE INDEX ON dim_addresses (address_id);
CREATE UNIQUE INDEX ON dim_customers (customer_id);
CREATE UNIQUE INDEX ON fact_table (order_id, time_id, address_id, customer_id, product_id);
