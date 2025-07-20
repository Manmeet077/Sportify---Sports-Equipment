# Sportify---Sports-Equipment


# SportifyX - Sports Inventory & Delivery System

## Overview

SportifyX is a full-stack web application built with:
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Java Spring Boot
- **Database**: MySQL

It allows users to browse and order sports products, while admins can manage inventory.

## Features

- User Registration and Login (admin and user roles)
- Product listing with add to cart functionality
- Shopping cart and order placement
- Admin dashboard to add/remove products
- Full database integration (MySQL)

## Database Tables

- `users`: Stores user credentials and roles
- `products`: Stores product details
- `orders`: Stores each user's orders
- `order_items`: Stores products inside each order

## Run Locally

### Prerequisites
- Java 17+
- MySQL 8+
- Maven

### Setup Steps
1. Create MySQL database:
   ```sql
   CREATE DATABASE sportsdb;
   ```
2. Import the provided `sportsdb_schema.sql` file.
3. Update `application.properties` with DB credentials.
4. Run the Spring Boot project:
   ```bash
   mvn spring-boot:run
   ```
5. Open `index.html` in browser for frontend.

## API Endpoints

- `POST /api/register`
- `POST /api/login`
- `GET /api/products`
- `POST /api/products` (admin)
- `DELETE /api/products/{name}` (admin)
- `POST /api/order`
