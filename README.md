# Simple Datawarehouse

### Instructions
#### Requirements:
- [Docker & docker-compose](https://docs.docker.com/engine/install/) installed

#### How to use application:
- run script - ./startSimpleDatawarehouse.sh
- stop script - ./stopSimpleDatawarehouse.sh
- uninstall script - ./removeSimpleDatawarehouse.sh
#### How to generate database data:
- ...

### Development Instructions
#### Requirements (recommended):
- Java 21.0.2
- Maven 3.9.6
- Angular 17.3.9
- Node.js 20.11.0
- npm 10.2.4

#### How to run backend:
- go to simple-datawarehouse-backend directory
- run 'mvn clean spring-boot:run'

#### How to run frontend:
- go to simple-datawarehouse-frontend directory
- run 'npm install'
- run 'ng serve'

#### How to run Apache NiFi:
- run script - ./startNifi.sh
- stop script - ./stopNifi.sh
- remove script - ./removeNifi.sh