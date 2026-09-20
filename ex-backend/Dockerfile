# 1단계: Maven 공식 이미지를 사용해 빌드
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# pom.xml과 소스 코드 복사
COPY pom.xml ./
COPY src ./src

# Maven을 이용해 패키징 (테스트 제외 시 -DskipTests 추가 가능)
RUN mvn clean package -DskipTests

# 2단계: 실행 스테이지
FROM eclipse-temurin:17-jre
WORKDIR /app

# 빌드 스테이지에서 생성된 jar 파일 복사 (target 폴더 내의 jar)
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]