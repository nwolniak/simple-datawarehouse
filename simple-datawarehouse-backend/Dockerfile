FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache curl
COPY target/SimpleDataWarehouse-0.0.1.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
