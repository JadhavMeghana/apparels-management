# Deployment Guide

This guide covers various deployment options for the Apparels Management System.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Environment Variables](#environment-variables)

## Prerequisites

- Java 17+
- Maven 3.6+
- Node.js 18+ and npm
- Docker & Docker Compose (for containerized deployment)
- PostgreSQL database (or Supabase account)

## Local Development

### Backend
```bash
cd apparels-management
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api

## Docker Deployment

### Option 1: Docker Compose (Recommended for Full Stack)

1. **Create environment file** (optional, or set environment variables):
   ```bash
   # Copy and edit .env.example
   cp .env.example .env
   ```

2. **Set environment variables**:
   ```bash
   export DATABASE_URL=jdbc:postgresql://db:5432/postgres
   export DATABASE_USERNAME=postgres
   export DATABASE_PASSWORD=your_password
   export POSTGRES_PASSWORD=your_password
   ```

3. **Build and run**:
   ```bash
   docker-compose up -d --build
   ```

4. **Access the application**:
   - Frontend: http://localhost
   - Backend API: http://localhost:8080/api

### Option 2: Individual Docker Containers

#### Build Backend:
```bash
docker build -t apparels-backend .
docker run -d -p 8080:8080 \
  -e DATABASE_URL=jdbc:postgresql://your-db-host:5432/postgres \
  -e DATABASE_USERNAME=postgres \
  -e DATABASE_PASSWORD=your_password \
  apparels-backend
```

#### Build Frontend:
```bash
cd frontend
docker build -t apparels-frontend .
docker run -d -p 80:80 apparels-frontend
```

## Production Deployment

### Build Artifacts

#### Build Script:
- **Linux/Mac**: `./build.sh`
- **Windows**: `build.bat`

#### Manual Build:

1. **Build Frontend**:
   ```bash
   cd frontend
   npm install
   npm run build
   # Output: src/main/resources/static/
   ```

2. **Build Backend**:
   ```bash
   cd apparels-management
   mvn clean package -DskipTests
   # Output: target/apparels-management-0.0.1-SNAPSHOT.jar
   ```

### Deploy Backend JAR

```bash
java -jar -Dspring.profiles.active=prod \
  -DDATABASE_URL=jdbc:postgresql://your-db-host:5432/postgres \
  -DDATABASE_USERNAME=postgres \
  -DDATABASE_PASSWORD=your_password \
  target/apparels-management-0.0.1-SNAPSHOT.jar
```

### Serve Frontend

The frontend is built into `src/main/resources/static/` and will be served by Spring Boot at the root URL when the backend starts.

Or use a web server:
- Copy contents of `src/main/resources/static/` to your web server
- Configure your web server to proxy `/api/*` to backend

### Using Supabase (Cloud Database)

If using Supabase, configure `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://your-project.supabase.co:5432/postgres
spring.datasource.username=postgres.your-project
spring.datasource.password=your_password
```

## Environment Variables

| Variable | Description | Default |
|---------|-------------|---------|
| `DATABASE_URL` | Database JDBC URL | `jdbc:postgresql://localhost:5432/postgres` |
| `DATABASE_USERNAME` | Database username | `postgres` |
| `DATABASE_PASSWORD` | Database password | - |
| `SPRING_PROFILES_ACTIVE` | Spring profile | `prod` |
| `DDL_AUTO` | Hibernate DDL mode | `update` |

## Troubleshooting

### 500 Internal Server Error
- Check database connection
- Verify environment variables
- Check application logs
- Ensure CORS is properly configured

### Database Connection Issues
- Verify database credentials
- Check network connectivity
- Ensure database is running
- Check firewall rules

### Frontend Not Loading
- Ensure frontend is built (`npm run build`)
- Check nginx/web server configuration
- Verify API proxy settings
- Check browser console for errors

## Health Checks

- Backend Health: `GET http://localhost:8080/api/actuator/health` (if actuator is added)
- API Test: `GET http://localhost:8080/api/categories`

## Security Notes

1. **Never commit sensitive data** (passwords, API keys) to version control
2. **Use environment variables** for production configuration
3. **Enable HTTPS** in production
4. **Configure CORS** appropriately for your domain
5. **Use strong database passwords**
6. **Keep dependencies updated**

## Support

For issues or questions, check:
- Application logs
- Database connection status
- Network connectivity
- Environment variable configuration
