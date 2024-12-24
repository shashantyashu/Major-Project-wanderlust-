# Wanderlust Project Report

## Overview
The Wanderlust project is a web application designed to manage travel-related listings, user reviews, and authentication. The application is built using the Node.js ecosystem with a focus on scalability, security, and user experience.

---

## Technology Stack

### Backend
1. **Node.js**: Runtime environment for building server-side applications.
2. **Express.js**: Framework for handling routing, middleware, and HTTP requests.
3. **Mongoose**: ODM (Object Data Modeling) library for MongoDB, used to manage database operations.
4. **Passport.js**: Authentication middleware for user login and session handling.
5. **Connect-Mongo**: Middleware for managing sessions stored in MongoDB.
6. **dotenv**: Library to load environment variables for configuration management.

### Frontend
1. **EJS (Embedded JavaScript)**: Templating engine to render dynamic HTML pages.
2. **Bootstrap** (via static files): Frontend library for styling and responsive design.

### Database
1. **MongoDB**: NoSQL database for storing user data, listings, and reviews.

### Middleware and Utilities
1. **Method-Override**: Allows support for HTTP verbs like PUT and DELETE.
2. **connect-flash**: Middleware for displaying flash messages.
3. **ejs-mate**: Layout and partial support for EJS templates.
4. **Session Management**: Ensures secure user sessions using cookies and MongoDB.

---

## Key Features
1. **User Authentication**:
   - Local authentication using Passport.js.
   - User session management with MongoDB as the session store.

2. **Listings Management**:
   - Create, Read, Update, and Delete (CRUD) operations on travel listings.
   - Middleware for validation and error handling.

3. **Reviews System**:
   - Nested routes for managing reviews linked to specific listings.
   - Flash messaging for user feedback.

4. **Error Handling**:
   - Custom error handling middleware for managing application-wide errors.
   - Graceful handling of 404 errors.

---

## Sample Queries

### 1. **Connecting to MongoDB**
```javascript
async function main() {
    await mongoose.connect(dbUrl);
}
```
**Result**: Establishes a connection to the MongoDB Atlas database using the `dbUrl` environment variable.

### 2. **Create a Sample Listing**
```javascript
app.get("/testListing", async (req, res) => {
    let sampleListing = new Listing({
        title: "My New Villa",
        description: "By the beach",
        price: 12000,
        location: "Calangute, Goa",
        country: "India",
    });
    await sampleListing.save();
    res.send("Listing saved successfully");
});
```
**Result**: Creates a sample travel listing and saves it to the database. The endpoint responds with a success message.

### 3. **User Registration Demo**
```javascript
app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "delta-student"
    });

    let registeredUser = await User.register(fakeUser, "helloworld");
    res.send(registeredUser);
});
```
**Result**: Registers a demo user with a username and email. Password hashing is handled automatically by Passport.js.

### 4. **Handling Invalid Routes**
```javascript
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});
```
**Result**: Any undefined routes are handled by creating a custom `ExpressError` instance, ensuring a user-friendly error message.

---

## Results

### 1. **Successful MongoDB Connection**
**Log Output**:
```
connected to DB
```
Indicates successful database connection.

### 2. **Sample Listing Creation**
**Database Entry**:
```json
{
    "_id": "64a123456789",
    "title": "My New Villa",
    "description": "By the beach",
    "price": 12000,
    "location": "Calangute, Goa",
    "country": "India",
    "__v": 0
}
```
**Response**:
```
Listing saved successfully
```

### 3. **User Registration**
**Database Entry**:
```json
{
    "_id": "64a987654321",
    "email": "student@gmail.com",
    "username": "delta-student",
    "hash": "hashedpasswordhere",
    "salt": "randomsaltvalue",
    "__v": 0
}
```
**Response**:
```
{
    "_id": "64a987654321",
    "email": "student@gmail.com",
    "username": "delta-student"
}
```

### 4. **404 Error Handling**
**Response**:
```
Page not found!
```
---

## Deployment Configuration

1. **Environment Variables**:
   - `NODE_ENV`: Environment mode (`development` or `production`).
   - `ATLASDB_URL`: MongoDB Atlas connection string.
   - `SECRET`: Session encryption key.

2. **Port**: Application listens on port `8080`.

3. **Static Files**: Public files are served from the `/public` directory.

---

## Conclusion
The Wanderlust project is a robust platform leveraging modern web development tools and practices. It demonstrates a scalable, secure approach to handling user authentication, database interactions, and error management. With further enhancements like cloud deployment and advanced features, this platform can serve as a production-ready application for travel enthusiasts.

## Contact
For any inquiries, please contact: 📧📧📧
- **Name**: Shashant
- **Email**: shashantyashu2004@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/shashant-yashu-383718338?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app 