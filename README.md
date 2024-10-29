# Simple Datawarehouse

Simple Datawarehouse is a web application designed to streamline ETL operations using Apache NiFi, explore data tables
and execute analytical queries. It provides an intuitive user interface which allows users to learn and experiment with
data warehouses world.

## Table of Contents

- [Instructions](#instructions)
    - [Requirements](#requirements)
    - [How to run application](#how-to-run-application)
    - [How to load Apache NiFi flow file](#how-to-load-apache-nifi-flow-file)
    - [Application Containers](#application-containers)
- [Database Schema](#database-schema)
- [Datawarehouse Schema](#datawarehouse-schema)
- [Development](#development)
    - [Requirements](#requirements-recommended)
    - [How to run backend](#how-to-run-backend)
    - [How to run frontend](#how-to-run-frontend)
    - [How to run Apache Nifi](#how-to-run-apache-nifi)
    - [How to clean databases](#how-to-clean-databases)

## Instructions

### Requirements:

- [Docker](https://docs.docker.com/engine/install/) installed
- docker and docker-compose commands available

### How to run application:

- run script

```
./scripts/startSimpleDatawarehouse.sh
```

- stop script

```
./scripts/stopSimpleDatawarehouse.sh
```

- uninstall script

```
./scripts/removeSimpleDatawarehouse.sh
```

Application UI will be available at http://localhost:80/

### How to load Apache NiFi flow file

1. Drag 'Process Group' into canvas and select nifi flow file.

```
resources/nifi_etl.json
```

<div align="center">
  <img src="resources/step1_video.gif" width="600" height="340" alt="step1">
</div>

2. Enable all controller services required by NiFi components in that group.

- How to navigate:
    - Right click on process group and select 'Enter group'.
    - Alternatively right click anywhere and select 'Leave group'.

<div align="center">
  <img src="resources/step2_video.gif" width="600" height="340" alt="step2">
</div>

3. Start & Wait & Stop ETL processes in 'Dim Tables' group.

- below tables will be affected
    - dim_time
    - dim_products
    - dim_addresses
    - dim_customers
    - dim_orders

<div align="center">
  <img src="resources/step3_video.gif" width="600" height="340" alt="step3">
</div>

4. Start & Wait & Stop ETL processes in 'Fact Table' group.

- below table will be affected
    - fact_table

<div align="center">
  <img src="resources/step4_video.gif" width="600" height="340" alt="step4">
</div>

### Application Containers

1. simple-datawarehouse-backend\
  Java Spring Boot based application responsible for executing SQL queries on datawarehouse.
2. simple-datawarehouse-frontend\
  Angular web application providing a user interface.
3. nifi\
  ETL (Extract, Transform, Load) tool.
4. postgres_ds\
  PostgreSQL database that serves as a data source for ETL processes.
5. postgres_dw\
  PostgreSQL database where the datawarehouse is modelled.
6. mysql_ds\
  MySQL database that serves as a data source for ETL processes.
7. mysql_dw\
  MySQL database where the datawarehouse is modelled.

## Database Schema

<div align="center">
  <img src="resources/database_schema.png" width="600" height="600" alt="database_schema">
</div>

## Datawarehouse Schema

<div align="center">
  <img src="resources/datawarehouse_schema.png" width="600" height="600" alt="datawarehouse_schema">
</div>

## Development

### Requirements (recommended):

- Java 21.0.2
- Maven 3.9.6
- Angular 17.3.9
- Node.js 20.11.0
- npm 10.2.4

### How to run backend:

- go to backend directory

```
cd simple-datawarehouse-backend
```

- run

```
mvn clean spring-boot:run
```

Backend will be available at http://localhost:8080/simple-datawarehouse

### How to run frontend:

- go to frontend directory

```
cd simple-datawarehouse-frontend
```

- run

```
npm install
```

```
ng serve
```

UI will be available at http://localhost:4200/

### How to run Apache NiFi:

- run script

```
./scripts/startNifi.sh
```

- stop script

```
./scripts/stopNifi.sh
```

- remove script

```
./scripts/removeNifi.sh
```

Apache Nifi will be available at http://localhost:4201/nifi

### How to clean databases:

- clean script

```
./scripts/cleanDatabases.sh
```

Database containers will be removed with associated volumes and started again.