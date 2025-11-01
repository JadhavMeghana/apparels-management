#!/bin/bash

echo "Building Apparels Management System..."

# Build frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Build backend
echo "Building backend..."
mvn clean package -DskipTests

echo "Build complete!"
echo "Frontend build: frontend/dist"
echo "Backend JAR: target/apparels-management-0.0.1-SNAPSHOT.jar"
