
install node      ----------npm install
npm run dev








Pizzeria Management System
Project Overview
Pizzeria Management System is a full-stack web application developed using React, Node.js, Express.js, MongoDB, JWT Authentication, and Material UI.

The application allows customers to browse pizza menus, place orders, track order status, generate bills, and choose payment options. Admin users can manage menu items, process orders, generate bills, and monitor business revenue.

The system follows a modern client-server architecture and implements role-based access control using JWT authentication.

Business Problem
Traditional pizza stores often face challenges in:

Managing menu items efficiently
Tracking customer orders
Generating bills automatically
Monitoring revenue
Providing real-time order status updates
This project solves these challenges through a centralized web-based application.

Technology Stack
Frontend
React.js
React Router
Axios
Material UI
Local Storage
Backend
Node.js
Express.js
JWT Authentication
REST APIs
Database
MongoDB
Mongoose ODM
Testing
Mocha
Chai
Supertest
Documentation
Swagger API Documentation
System Users
Admin
Admin has full control over the application.

Features
Login
Logout
Add Menu Item
Update Menu Item
Delete Menu Item
View Orders
Accept Orders
Reject Orders
Update Order Status
Generate Bills
View Monthly Revenue
View Dashboard Statistics
Customer
Features
Register
Login
Logout
Browse Menu
Filter Menu Categories
Add Multiple Items
Place Order
Cancel Order
View Orders
View Bills
Download Invoice
Receive Order Status Updates
Database Design
User Collection
Fields:

id
name
email
password
role
Relationship:

One User can create multiple Orders.

MenuItem Collection
Fields:

name
price
category
description
image
Categories:

Pizza
Sides
Beverages
Combo
New Launches
Best Sellers
Order Collection
Fields:

userId
items
totalAmount
deliveryMode
paymentOption
status
paymentStatus
Relationship:

One Order belongs to one User.

Bill Collection
Fields:

orderId
customerId
amount
tax
totalBill
Relationship:

One Bill belongs to one Order.

Application Architecture
Frontend (React)

↓

Axios API Calls

↓

Node.js + Express REST APIs

↓

Service Layer

↓

MongoDB Database

Authentication & Security
Implemented JWT Authentication.

Process:

User Login
JWT Token Generated
Token Stored in Local Storage
Token Sent in Authorization Header
Middleware Validates Token
Role-Based Access Control Applied
Example Roles:

Admin
Customer
Protected APIs cannot be accessed without a valid token.

Sprint I Implementation
Database Schema Creation
Created MongoDB collections:

Users
Orders
Menu Items
Bills
Authentication
Implemented:

Register
Login
Logout
Frontend Template
Created:

Login Page
Register Page
Dashboard Layout
Navigation Menu
Sprint II Implementation
Search Functionality
Implemented menu filtering by category.

Menu CRUD
Admin can:

Create Menu Item
Read Menu Item
Update Menu Item
Delete Menu Item
Order Management
Customer can:

Place Order
Cancel Order
Billing
Implemented:

Bill Generation
Bill Viewing
Invoice Download
JWT Security
Implemented route protection and role-based authorization.

Testing
Created API tests using:

Mocha
Chai
Supertest
Sprint III Implementation
Service Layer
Created separate services:

AuthService
MenuService
OrderService
BillingService
DashboardService
PaymentService
MessageService
Controller Layer
Created REST Controllers:

AuthController
MenuController
OrderController
BillController
DashboardController
Messaging Service
Implemented order status notifications.

Examples:

Pending
Accepted
Preparing
Delivered
Cancelled
Payment Service
Supported:

UPI
Card
COD
Frontend Integration
Integrated React frontend with backend APIs using Axios.

Responsive Design
Used Material UI Grid system.

Application works on:

Desktop
Tablet
Mobile
Extra Feature
AI Assistant Chatbot

Functions:

Menu Recommendations
Order Tracking
Delivery Information
Payment Queries
Order Cancellation
API Documentation
Implemented Swagger Documentation.

Available APIs:

Authentication APIs
Menu APIs
Order APIs
Billing APIs
Dashboard APIs
AI Assistant APIs
Swagger URL:

http://localhost:5000/api-docs

Testing Strategy
Unit Testing
Tested:

Authentication APIs
Menu APIs
Order APIs
End-to-End Testing
Validated complete flow:

User Registration
Login
Browse Menu
Place Order
Update Order Status
Generate Bill
Download Invoice
Challenges Faced
Challenge 1
JWT Role-Based Authorization

Solution:

Implemented custom authentication middleware.

Challenge 2
Order Status Synchronization

Solution:

Created MessageService for notifications.

Challenge 3
Revenue Calculation

Solution:

Used MongoDB Aggregation Pipeline.

Challenge 4
Frontend-Backend Integration

Solution:

Used Axios interceptors with JWT token handling.

Key Achievements
Full Stack Application Developed
RESTful API Architecture
JWT Security
Role-Based Access Control
MongoDB Integration
Swagger Documentation
Automated Testing
Responsive UI
AI Assistant Integration
Future Enhancements
Online Payment Gateway Integration
Real-Time Notifications using Socket.io
SMS & Email Notifications
Delivery Tracking using Maps
Coupon & Discount Management
Cloud Deployment (AWS/Azure)
Conclusion
The Pizzeria Management System successfully digitizes pizza store operations by providing secure authentication, menu management, order processing, billing, revenue tracking, and customer interaction through an AI-powered assistant.

The project demonstrates full-stack development skills, REST API development, database design, authentication, testing, documentation, and responsive UI development.