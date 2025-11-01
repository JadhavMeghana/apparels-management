@echo off
echo Building Apparels Management System...

REM Build frontend
echo Building frontend...
cd frontend
call npm install
call npm run build
cd ..

REM Build backend
echo Building backend...
call mvn clean package -DskipTests

echo Build complete!
echo Frontend build: frontend/dist
echo Backend JAR: target/apparels-management-0.0.1-SNAPSHOT.jar

pause
