FROM postgres:16-alpine

ENV POSTGRES_DB=postgres_dw
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password

COPY postgresql_dw_ddl.sql /docker-entrypoint-initdb.d/1.sql
