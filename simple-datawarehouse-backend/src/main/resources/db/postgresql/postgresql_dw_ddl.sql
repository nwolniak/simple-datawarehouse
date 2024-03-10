CREATE TABLE IF NOT EXISTS dim_time
(
    timeId  serial PRIMARY KEY,
    year    integer NOT NULL,
    month   integer NOT NULL,
    day     integer NOT NULL,
    quarter integer NOT NULL,
    weekday integer NOT NULL,
    yearday integer NOT NULL
);

CREATE TABLE IF NOT EXISTS dim_order
(
    orderId     serial PRIMARY KEY,
    order_price numeric(7, 2),
    paid        boolean,
    comment     varchar(200)
);

CREATE TABLE IF NOT EXISTS dim_address
(
    addressId serial PRIMARY KEY,
    country   varchar(40) NOT NULL,
    city      varchar(40) NOT NULL,
    street    varchar(40) NOT NULL,
    zip       char(6)     NOT NULL
);

CREATE TABLE IF NOT EXISTS dim_customer
(
    customerId    serial PRIMARY KEY,
    first_name    varchar(40) NOT NULL,
    last_name     varchar(40) NOT NULL,
    phone         varchar(16) NOT NULL,
    email         varchar(40),
    date_of_birth date
);


CREATE TABLE IF NOT EXISTS fact_table
(
    timeId     integer,
    orderId    integer,
    customerId integer,
    addressId  integer,
    price      numeric(7, 2) NOT NULL,
    PRIMARY KEY (timeId, orderId, customerId, addressId)
);

CREATE UNIQUE INDEX ON dim_time (timeId);
CREATE UNIQUE INDEX ON dim_order (orderId);
CREATE UNIQUE INDEX ON dim_address (addressId);
CREATE UNIQUE INDEX ON dim_customer (customerId);
CREATE UNIQUE INDEX ON fact_table (timeId, orderId, customerId, addressId);
