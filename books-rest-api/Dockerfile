# build application
FROM gradle:7.1.1-jdk11 AS build
WORKDIR /workspace
COPY . .
RUN chmod +x gradle
RUN gradle bootJar --no-daemon
# setup image
FROM openjdk:11 AS image
EXPOSE 8080
RUN mkdir /app
COPY --from=build /workspace/build/libs/*.jar /app/app.jar
ENTRYPOINT ["java", "-jar","/app/app.jar"]
