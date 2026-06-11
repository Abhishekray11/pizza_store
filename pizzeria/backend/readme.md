npm start 
npm test
for swagger doc open http://localhost:5000/api-docs
----------------------------------------------------------------------------------------------------------------------
Problem Statement:
Pizza Store:
Pizzeria is an application where we can order the pizza of our choice.
There are 2 users in the application
1. Admin
2. Customer

##Admin Stories
1. As an admin, I should be able to login and logout into the application
2. As an admin, I should be able to do CRUD on the items available in the menu
3. As an admin, I can accept or reject the order form the user/ users
4. As an admin, I should be able send the message or pop up to users on order status
5. As an admin, I should be able to generate the bill of particular user
6. As an admin, I should be able to see the monthly revenue of the shop.

##User Stories
1. As an user, I should be able to register, login, and logout into the application
2. As a user, I should be able to see the different categories of the menu like pizza, sides, beverages, combo, new launches, bestsellers.
3. As a user, I should be able to select more than one item from the same category or different category.
4. As an user, I should be able to place / cancel the order
5. Once the order is placed I should be able to receive message or pop up on the order the status
6. As a user, I should be able to see the bill amount for the order along with payment options.
7. As a user, I should be able to see the mode of delivery.

Sprint Plan:
Sprint I Objectives:
1. Create database schema (along with their relationships)
2. CRUD on User and Admin (login, logout, register)
3. Create template using React
Sprint II Objective:
1. Develop search functionality based on different criteria.
2. The menu items CRUD for Admin
3. Create / cancel order from user
4. Implement billing option (generate for Owner and view for User)
5. Implement Spring security, JWT
6. Implement component and end-to-end testing
Sprint III Objective:
1. Create Data Transfer Objects
2. Create Service Layer logic
4. Create controller to direct rest API
5. Create message service for order status
6. Create payment mode service
7. Integrate FrontEnd with BackEnd
8. Add extra features
9. Make application responsive

## Instructions:
1. Set Up MongoDB Database:
1. Install MongoDB on your system if not already installed.
2. Create a MongoDB database to store application data.
3. Design appropriate collections to store user and application information.

2. Develop Backend with Node.js and Express.js:
1. Create a Node.js project.
2. Set up Express.js to handle routing and middleware.
3. Implement APIs for user authentication (register, login, logout) and CRUD operations for applications.
4. Ensure APIs are RESTful and follow best practices.
5. Interact with MongoDB.

3. Develop Frontend with React:
1. Set up an React project.
2. Create components for login, registration, application listing, application details, user profile, etc.
3. Implement routing to navigate between different components.
4. Integrate HTTP client module to communicate with the backend APIs.
5. Use React Material or Bootstrap for UI components to ensure better UI.

4. Make Application Responsive:
1. Use CSS media queries and flexible layout techniques to ensure the application is responsive across different devices and screen sizes.

5. Handle Session using Local Storage:
1. Implement session management using JSON Web Tokens (JWT).
2. Store JWT tokens in the local storage to maintain user sessions.

6. Implement Proper Component Structure:
1. Organize React components, services, and modules following best practices and maintainability.

7. Include Client-Side Validation:
1. Implement client-side form validation using React forms and validators to ensure data integrity and
improve user experience.

8. Perform Component and End-to-End Testing:
1. Write unit tests for React components and services using proper testing framework.
2. Conduct end-to-end testing using a testing framework to ensure the application works as expected
from the user's perspective.

9. Create a Single Page Application (SPA):
1. Ensure the application functions as a single-page application where navigation occurs without
refreshing the entire page.
2. Utilize React's routing capabilities to achieve this behavior











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