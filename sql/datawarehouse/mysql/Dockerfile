FROM mysql:8.4.2

ENV MYSQL_DATABASE=mysql_dw
ENV MYSQL_RANDOM_ROOT_PASSWORD=true
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password

COPY mysql_dw_ddl.sql /docker-entrypoint-initdb.d/1.sql
