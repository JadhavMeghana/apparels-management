# Quick Setup Guide

## Backend Setup

1. **Start the Spring Boot Application**
   ```bash
   cd apparels-management
   mvn spring-boot:run
   ```
   The backend will run on `http://localhost:8080`

## Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

## First Time Setup

1. **Create Categories First**
   - Navigate to Categories page
   - Create some categories (e.g., "T-Shirts", "Jeans", "Shirts")

2. **Add Products**
   - Go to Products page
   - Click "Add Product"
   - Fill in product details and select a category

3. **Manage Inventory**
   - Go to Inventory page
   - Add inventory for your products
   - Set stock levels and reorder levels

4. **View Dashboard**
   - Check the Dashboard for overview and low stock alerts

## Building for Production

### Build Frontend
```bash
cd frontend
npm run build
```
This builds the frontend into `src/main/resources/static`

### Build Backend
```bash
cd apparels-management
mvn clean package
```

### Run Production Build
```bash
java -jar target/apparels-management-0.0.1-SNAPSHOT.jar
```
Visit `http://localhost:8080` - the frontend is now served by Spring Boot!

## Troubleshooting

### CORS Errors
- Make sure the backend is running on port 8080
- Make sure the frontend dev server is running on port 3000
- The CORS configuration allows both `localhost:3000` and `localhost:5173`

### Database Connection
- Verify your database credentials in `application.properties`
- Make sure PostgreSQL/Supabase is accessible

### Port Conflicts
- Backend default: 8080 (change in `application.properties` with `server.port`)
- Frontend default: 3000 (change in `vite.config.ts`)
