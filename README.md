# TheDigitalDinner (Eatos)

## Overview
TheDigitalDinner is a modern restaurant ordering system that streamlines the dining experience. Built with React and Node.js, it offers a seamless interface for customers to browse menus, place orders, and track their dining history. The system features real-time cart updates, secure order processing, and a clean, intuitive design.

## Features
- **Interactive Menu**: Browse categorized dishes with images and descriptions
- **Smart Cart**: Real-time price calculations and quantity management
- **Order Processing**: Streamlined checkout with phone verification
- **Order History**: Track past orders using phone number lookup
- **Responsive Design**: Optimized for both desktop and mobile devices

## Tech Stack
### Frontend
- React.js with Vite
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management

### Backend
- Node.js & Express
- PostgreSQL for order management
- MongoDB for menu items
- RESTful API architecture

## API Endpoints
- `GET /api/menu`: Fetch menu items
- `POST /api/order`: Place new order
- `GET /api/order/:phone`: Fetch order history

## Database Architecture
We've implemented a hybrid database approach to optimize for different data requirements:

### PostgreSQL for Orders
- **Structured Data**: Orders have a fixed schema with customer details, items, and timestamps
- **ACID Compliance**: Critical for maintaining order integrity and financial transactions
- **Relational Queries**: Efficient for retrieving order history and generating reports
- **Data Consistency**: Ensures accurate order tracking and financial records
- **Transaction Support**: Handles concurrent orders reliably

### MongoDB for Menu Items
- **Flexible Schema**: Easily change menu items with different attributes
- **Rich Queries**: Better for searching and filtering menu items
- **Dynamic Fields**: Accommodates different food categories with distinct properties
- **Scalability**: Can handle numerous menu updates and additions
- **Document Structure**: Natural home for nested data such as ingredients and variations

