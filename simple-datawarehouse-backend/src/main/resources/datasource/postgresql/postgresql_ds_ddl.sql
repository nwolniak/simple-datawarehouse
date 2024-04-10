CREATE TABLE IF NOT EXISTS orders
(
    orderId     serial PRIMARY KEY,
    order_date  date,
    order_price numeric(7, 2),
    paid        boolean,
    comment     varchar(200),
    delivered   boolean,
    customerId  integer,
    addressId   integer
);

CREATE TABLE IF NOT EXISTS addresses
(
    addressId     serial PRIMARY KEY,
    country       varchar(40) NOT NULL,
    city          varchar(40) NOT NULL,
    street        varchar(40) NOT NULL,
    zip           char(6)     NOT NULL,
    contact_phone varchar(16) NOT NULL
);

CREATE TABLE IF NOT EXISTS customers
(
    customerId    serial PRIMARY KEY,
    first_name    varchar(40) NOT NULL,
    last_name     varchar(40) NOT NULL,
    phone         varchar(16) NOT NULL,
    email         varchar(40),
    date_of_birth date,
    city          varchar(40) NOT NULL,
    street        varchar(40) NOT NULL,
    zip           varchar(6)  NOT NULL
);

CREATE UNIQUE INDEX ON orders (orderId);
CREATE UNIQUE INDEX ON addresses (addressId);
CREATE UNIQUE INDEX ON customers (customerId);
