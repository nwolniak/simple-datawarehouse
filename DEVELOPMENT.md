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