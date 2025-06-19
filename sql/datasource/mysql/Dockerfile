FROM mysql:8.4.2

ENV MYSQL_DATABASE=mysql_ds
ENV MYSQL_RANDOM_ROOT_PASSWORD=true
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password

COPY mysql_ds_ddl.sql /docker-entrypoint-initdb.d/1.sql
COPY mysql_ds_dml.sql /docker-entrypoint-initdb.d/2.sql
