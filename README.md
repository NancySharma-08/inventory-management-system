# Inventory Management System Backend

A backend system to manage products, inventory, orders, and reports using Node.js, Express, SQL Server, Redis, JWT authentication, and role-based authorization.

---

## Features

- User Registration and Login
- JWT-based Authentication
- Role-based Authorization (Admin and Staff)
- Product CRUD Operations
- Inventory Management (Stock In / Stock Out)
- Order Management
- Reports Module
- Request Logging Middleware
- Global Error Handling Middleware
- Input Validation using Joi
- Redis Caching for Product List and Inventory Summary

---

## Tech Stack

- Node.js
- Express.js
- SQL Server
- Redis
- JWT
- Joi
- Morgan
- Helmet
- CORS

---

## Project Structure

```bash
inventory-management-system/
│
├── config/
│   ├── db.js
│   └── redis.js
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── inventoryController.js
│   ├── orderController.js
│   └── reportController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── errorMiddleware.js
│   ├── loggerMiddleware.js
│   ├── validateMiddleware.js
│   └── cacheMiddleware.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── inventoryRoutes.js
│   ├── orderRoutes.js
│   └── reportRoutes.js
│
├── services/
│   ├── authService.js
│   ├── productService.js
│   ├── inventoryService.js
│   ├── orderService.js
│   └── reportService.js
│
├── validators/
│   ├── authValidator.js
│   ├── productValidator.js
│   ├── inventoryValidator.js
│   └── orderValidator.js
│
├── utils/
│   ├── generateToken.js
│   └── responseHandler.js
│
├── app.js
├── server.js
├── .env
├── package.json
└── README.md
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd inventory-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Add the following variables:

```env
PORT=3005

DB_SERVER=localhost
DB_DATABASE=InventoryDB

JWT_SECRET=yourSecretKey

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

> If using SQL Server with Windows Authentication, configure `db.js` accordingly.

### 4. Run SQL Server scripts

Create:
- Database
- Tables
- Stored Procedures

### 5. Start Redis

Make sure Redis server is running on:

```env
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

### 6. Run the project

```bash
npm run dev
```

Server will run on:

```bash
http://localhost:3005
```

---

## API Modules

### Auth APIs
- Register User
- Login User

### Product APIs
- Add Product
- Get All Products
- Get Product By Id
- Update Product
- Delete Product

### Inventory APIs
- Stock In
- Stock Out
- Get Current Stock
- Get Inventory Transactions
- Get Inventory Summary

### Order APIs
- Create Order
- Get All Orders
- Get Order By Id

### Report APIs
- Low Stock Report
- Inventory Summary Report
- Order Summary Report
- Sales Summary Report

---

## Authentication

Protected routes require JWT token in headers:

```http
Authorization: Bearer <token>
```

---

## Roles

### Admin
- Manage Products
- Manage Inventory
- View Reports
- Create and View Orders

### Staff
- View Products
- View Inventory
- Create and View Orders

---

## Caching

Redis caching is implemented for:

- Product List
- Inventory Summary

Cache is cleared automatically when product or inventory data changes.

---

## Validation

Input validation is implemented using Joi for:

- Register
- Login
- Product
- Inventory
- Order

---

## Error Handling

A global error handling middleware is used for consistent error responses.

---

## Logging

Request logging is implemented using:

- Morgan
- Custom logger middleware

---

## Future Enhancements

- Low stock alerts
- Pagination and filtering
- Bulk upload using CSV
- Database transactions for order creation
- Unit testing
- Implement database transactions for atomic order processing

---

## Sample Admin User

```json
{
  "email": "admin@test.com",
  "password": "123456"
}




## Author

Nancy Sharma