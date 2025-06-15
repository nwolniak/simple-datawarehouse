FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /simple-datawarehouse-backend
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /simple-datawarehouse-backend
RUN apk add --no-cache curl
COPY --from=build /simple-datawarehouse-backend/target/SimpleDataWarehouse-0.0.1.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
