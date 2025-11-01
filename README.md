# Apparels Management System

A comprehensive apparel management system built with Spring Boot backend and React frontend.

## Features

### Backend (Spring Boot)
- RESTful API for Products, Categories, and Inventory
- PostgreSQL database (Supabase)
- JPA/Hibernate for database operations
- Complete CRUD operations
- Advanced search and filtering

### Frontend (React + TypeScript)
- Modern, responsive UI with Tailwind CSS
- Dashboard with statistics and alerts
- Products management with search and filtering
- Categories management
- Inventory management with low stock alerts
- Real-time stock updates

## Tech Stack

### Backend
- Spring Boot 3.5.7
- Spring Data JPA
- PostgreSQL (Supabase)
- Lombok
- Maven

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React (icons)

## Getting Started

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 18+
- PostgreSQL database (or Supabase account)

### Backend Setup

1. Configure database connection in `src/main/resources/application.properties`

2. Build and run:
```bash
cd apparels-management
mvn clean install
mvn spring-boot:run
```

The backend will start at `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The frontend will start at `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/products/search` - Search products with filters

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID
- `POST /api/categories` - Create category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

### Inventory
- `GET /api/inventory` - Get all inventory
- `GET /api/inventory/{id}` - Get inventory by ID
- `POST /api/inventory/product/{productId}` - Create inventory
- `PUT /api/inventory/{id}` - Update inventory
- `PUT /api/inventory/{id}/stock` - Update stock level
- `POST /api/inventory/{id}/add-stock` - Add stock
- `POST /api/inventory/{id}/remove-stock` - Remove stock
- `GET /api/inventory/low-stock` - Get low stock items

## Building for Production

### Backend
```bash
mvn clean package
java -jar target/apparels-management-0.0.1-SNAPSHOT.jar
```

### Frontend
The frontend is configured to build into the Spring Boot static resources folder:
```bash
cd frontend
npm run build
```

After building, the static files will be in `src/main/resources/static` and will be served by Spring Boot.

## Project Structure

```
apparels-management/
├── src/
│   ├── main/
│   │   ├── java/com/apparels/management/
│   │   │   ├── config/          # Configuration (CORS)
│   │   │   ├── controller/       # REST controllers
│   │   │   ├── entity/           # JPA entities
│   │   │   ├── repository/       # Data repositories
│   │   │   └── service/          # Business logic
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/          # Frontend build output
│   └── test/
├── frontend/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── package.json
└── pom.xml
```

## License

This project is for demonstration purposes.
