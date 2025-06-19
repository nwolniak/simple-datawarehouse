FROM postgres:16-alpine

ENV POSTGRES_DB=postgres_ds
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password

COPY postgresql_ds_ddl.sql /docker-entrypoint-initdb.d/1.sql
COPY postgresql_ds_dml.sql /docker-entrypoint-initdb.d/2.sql
