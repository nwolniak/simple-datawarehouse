DROP TABLE IF EXISTS fact_table;
DROP TABLE IF EXISTS dim_time;
DROP TABLE IF EXISTS dim_products;
DROP TABLE IF EXISTS dim_addresses;
DROP TABLE IF EXISTS dim_customers;
DROP TABLE IF EXISTS dim_orders;

CREATE TABLE IF NOT EXISTS dim_time
(
    time_id serial PRIMARY KEY,
    date    varchar(40) NOT NULL,
    year    integer     NOT NULL,
    month   integer     NOT NULL,
    day     integer     NOT NULL,
    quarter integer     NOT NULL,
    weekday integer     NOT NULL,
    yearday integer     NOT NULL,
    CONSTRAINT unique_time UNIQUE (date)
);

CREATE TABLE IF NOT EXISTS dim_products
(
    product_id        serial PRIMARY KEY,
    source_product_id integer     NOT NULL,
    source_id         integer     NOT NULL,
    product_name      varchar(40) NOT NULL,
    price             numeric(7, 2),
    CONSTRAINT unique_product UNIQUE (product_name, price)
);

CREATE TABLE IF NOT EXISTS dim_addresses
(
    address_id        serial PRIMARY KEY,
    source_address_id integer     NOT NULL,
    source_id         integer     NOT NULL,
    country           varchar(40) NOT NULL,
    city              varchar(40) NOT NULL,
    street            varchar(40) NOT NULL,
    zip               char(6)     NOT NULL,
    CONSTRAINT unique_address UNIQUE (country, city, street, zip)
);

CREATE TABLE IF NOT EXISTS dim_customers
(
    customer_id        serial PRIMARY KEY,
    source_customer_id integer     NOT NULL,
    source_id          integer     NOT NULL,
    first_name         varchar(40) NOT NULL,
    last_name          varchar(40) NOT NULL,
    phone              varchar(16) NOT NULL,
    email              varchar(40),
    date_of_birth      date,
    CONSTRAINT unique_customer UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS dim_orders
(
    order_id        serial PRIMARY KEY,
    source_order_id integer NOT NULL,
    source_id       integer NOT NULL,
    CONSTRAINT unique_order UNIQUE (source_order_id, source_id)
);

CREATE TABLE IF NOT EXISTS fact_table
(
    order_id         integer REFERENCES dim_orders (order_id),
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
CREATE UNIQUE INDEX ON dim_orders (order_id);
CREATE UNIQUE INDEX ON fact_table (order_id, time_id, address_id, customer_id, product_id);
