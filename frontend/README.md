# Apparels Management Frontend

Modern React frontend for the Apparels Management System built with Vite, TypeScript, and Tailwind CSS.

## Features

- 📊 **Dashboard** - Overview with statistics and low stock alerts
- 📦 **Products Management** - Complete CRUD operations for products
- 🗂️ **Categories Management** - Manage product categories
- 📋 **Inventory Management** - Track stock levels with alerts
- 🔍 **Search & Filter** - Advanced search and filtering capabilities
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

The Vite dev server is configured to proxy API requests to the Spring Boot backend at `http://localhost:8080`.

## Build

Build for production:
```bash
npm run build
```

This will build the frontend and output the files to `../src/main/resources/static`, where Spring Boot can serve them.

## Production

After building, the static files are served directly by Spring Boot. Simply start the Spring Boot application and the frontend will be available at the root URL.

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components (Layout, etc.)
│   ├── pages/          # Page components (Dashboard, Products, etc.)
│   ├── services/       # API service layer
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main app component with routing
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.ts      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```
