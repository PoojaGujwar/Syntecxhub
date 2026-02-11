## Notes App Backend API

A secure and production-style backend for a Notes application built using Node.js, Express, MongoDB, and JWT Authentication.

This project demonstrates authentication, authorization, CRUD operations, database relations, and soft delete functionality.

## Features

User Signup & Login (JWT Authentication)
Password hashing using bcrypt
Create, Read, Update, Delete (CRUD) Notes
Each note is linked to a specific user
Authorization — users can access only their notes
Soft Delete (Archive notes instead of permanent deletion)
Secure routes using middleware
MongoDB relations using Mongoose ref and populate

## Tech Stack

Node.js
Express.js
MongoDB
Mongoose
JWT (jsonwebtoken)
bcrypt
dotenv

## API Endpoints
### auth Routes

| Method | Endpoint | Description       |
| ------ | -------- | ----------------- |
| POST   | /signup  | Register new user |
| POST   | /login   | Login user        |

### Notes Routes
| Method | Endpoint   | Description                     |
| ------ | ---------- | ------------------------------- |
| POST   | /notes     | Create note                     |
| GET    | /notes     | Get all notes of logged-in user |
| GET    | /notes/:id | Get single note (owner only)    |
| PUT    | /notes/:id | Update note                     |
| DELETE | /notes/:id | Archive note (soft delete)      |

### Security Implemented

Passwords are hashed before storing
JWT-based authentication
Owner-based authorization (users cannot access others' notes)
Soft delete using isArchived flag

### Installation & Setup

Clone the repository
```
git clone <your-repo-link>
```

Install dependencies
```
npm install
```

Create .env file
```
PORT=4000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Start server
```
npm start
```

### Learning Outcomes

This project helped in understanding:
REST API design
JWT authentication flow
MongoDB data modeling
Mongoose populate & relations
Authorization logic
Production-style backend structure

###Author

Pooja Gujwar
Full Stack Developer (MERN)