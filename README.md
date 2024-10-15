# Simple Datawarehouse

Simple Datawarehouse is a web application designed to streamline ETL operations using Apache NiFi, explore data tables
and execute analytical queries. It provides an intuitive user interface which allows users to learn and experiment with
data warehouses world.

## Table of Contents

- [Instructions](#instructions)
    - [Requirements](#requirements)
    - [How to run application](#how-to-run-application)
    - [Application Containers](#application-containers)
- [Development](#development)
    - [Requirements](#requirements-recommended)
    - [How to run backend](#how-to-run-backend)
    - [How to run frontend](#how-to-run-frontend)
    - [How to run Apache Nifi](#how-to-run-apache-nifi)

## Instructions

### Requirements:

- [Docker](https://docs.docker.com/engine/install/) installed
- docker and docker-compose commands available

### How to run application:

- run script - ./scripts/startSimpleDatawarehouse.sh
- stop script - ./scripts/stopSimpleDatawarehouse.sh
- uninstall script - ./scripts/removeSimpleDatawarehouse.sh

Application UI will be available at http://localhost:80/



### Application Containers

- simple-datawarehouse-backend
    - A Java Spring Boot based application responsible for executing SQL queries on datawarehouse.
- simple-datawarehouse-frontend
    - An Angular web application providing a user interface.
- nifi
    - An ETL (Extract, Transform, Load) tool.
- postgres_ds
    - A PostgreSQL database that serves as a data source for ETL processes.
- postgres_dw
    - A PostgreSQL database where the datawarehouse is modelled.
- mysql_ds
    - A MySQL database that serves as a data source for ETL processes.
- mysql_dw
    - A MySQL database where the datawarehouse is modelled.

## Development

### Requirements (recommended):

- Java 21.0.2
- Maven 3.9.6
- Angular 17.3.9
- Node.js 20.11.0
- npm 10.2.4

### How to run backend:

- go to simple-datawarehouse-backend directory
- run 'mvn clean spring-boot:run'

Backend will be available at http://localhost:8080/simple-datawarehouse

### How to run frontend:

- go to simple-datawarehouse-frontend directory
- run 'npm install'
- run 'ng serve'

UI will be available at http://localhost:4200/

### How to run Apache NiFi:

- run script - ./scripts/startNifi.sh
- stop script - ./scripts/stopNifi.sh
- remove script - ./scripts/removeNifi.sh

Apache Nifi will be available at http://localhost:4201/nifi