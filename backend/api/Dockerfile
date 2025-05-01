# Etapa 1: Build (Maven + Java 21)
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /build

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Etapa 2: Runtime (somente app.jar)
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=builder /build/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
