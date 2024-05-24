FROM openjdk:21

WORKDIR /simple-datawarehouse-backend

COPY target/SimpleDataWarehouse-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "--enable-preview", "-jar", "app.jar"]