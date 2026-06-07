# Store Rating System (Roxiler Full Stack Coding Challenge)

A full-stack role-based web application where users can register, login, view stores, and submit ratings.  
The system supports **Admin, Normal User, and Store Owner** roles with secure authentication and structured dashboards.

---

# Features

## Authentication System
- User Signup & Login
- JWT-based authentication
- Password hashing using bcrypt
- Secure protected routes

---

## Roles & Permissions

### Admin
- Create Users (Admin / User / Store Owner)
- Create Stores with Owner assignment
- View Dashboard:
  - Total Users
  - Total Stores
  - Total Ratings
- View all users
- View all stores
- Role-based access control

---

### Normal User
- Register & Login
- View all stores
- Search stores by name/address
- Submit rating (1–5)
- Update submitted rating
- View average store ratings

---

### Store Owner
- View assigned store
- View ratings submitted by users
- See average rating of store

---

# Core Functionalities

- JWT Authentication
- Role-based Authorization Middleware
- Store Rating System (1 to 5)
- One user can rate a store only once
- Update existing rating instead of duplicate entry
- Dynamic average rating calculation
- Foreign key relationship between users and stores
- Admin analytics dashboard

---

# Tech Stack

## Backend
- Node.js
- Express.js
- MySQL
- JWT (Authentication)
- bcrypt (Password Encryption)

## Frontend
- React.js
- Axios
- React Router

---

# atabase Schema

## Users Table
| Column | Type |
|--------|------|
| id | INT (PK) |
| name | VARCHAR |
| email | VARCHAR |
| password | VARCHAR |
| address | VARCHAR |
| role | ENUM (ADMIN, USER, STORE_OWNER) |

---

## Stores Table
| Column | Type |
|--------|------|
| id | INT (PK) |
| name | VARCHAR |
| email | VARCHAR |
| address | VARCHAR |
| owner_id | INT (FK → users.id) |
| created_at | TIMESTAMP |

---

## Ratings Table
| Column | Type |
|--------|------|
| id | INT (PK) |
| user_id | INT (FK → users.id) |
| store_id | INT (FK → stores.id) |
| rating | INT (1–5) |

---

# Setup Instructions

## 1️Clone Repository
```bash
git clone <https://github.com/divya-kawale/store-rating-system.git>
cd store-rating-system
