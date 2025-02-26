# Recruitment Helper API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

### Login
Authenticate a user and get a JWT token.

```http
POST /auth/login
```

**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```

**Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "token": "string",
        "employee": {
            "EmployeeID": "number",
            "FirstName": "string",
            "LastName": "string",
            "Email": "string",
            "Role": "Admin | TeamLead | Recruiter | Manager"
        }
    },
    "message": "Login successful"
}
```

**Error Response (401 Unauthorized):**
```json
{
    "success": false,
    "message": "Invalid email or password"
}
```

### Register New User
Create a new user (requires Recruiter role).

```http
POST /auth/signup
Authorization: Bearer {token}
```

**Request Body:**
```json
{
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "designation": "string" (optional),
    "departmentId": "number" (optional),
    "role": "Admin | TeamLead | Recruiter | Manager"
}
```

**Response (201 Created):**
```json
{
    "success": true,
    "data": {
        "employee": {
            "EmployeeID": "number",
            "FirstName": "string",
            "LastName": "string",
            "Email": "string",
            "Role": "string"
        }
    },
    "message": "User registered successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
    "success": false,
    "message": "Email already registered"
}
```

## Employees

### Get All Employees
Get a list of all employees (requires Recruiter or Manager role).

```http
GET /employees
Authorization: Bearer {token}
```

**Query Parameters:**
- `page`: number (optional, default: 1)
- `limit`: number (optional, default: 10)
- `search`: string (optional)
- `departmentId`: number (optional)
- `designation`: string (optional)
- `sortBy`: string (optional)
- `sortOrder`: 'asc' | 'desc' (optional)

**Response (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "EmployeeID": "number",
            "FirstName": "string",
            "LastName": "string",
            "Email": "string",
            "Designation": "string",
            "CreatedAt": "date",
            "Department": {
                "DepartmentName": "string"
            },
            "Manager": {
                "EmployeeID": "number",
                "FirstName": "string",
                "LastName": "string",
                "Designation": "string",
                "Email": "string"
            }
        }
    ],
    "message": "Employees retrieved successfully",
    "pagination": {
        "total": "number",
        "page": "number",
        "limit": "number"
    }
}
```

### Get Employee by ID
Get details of a specific employee.

```http
GET /employees/:id
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "EmployeeID": "number",
        "FirstName": "string",
        "LastName": "string",
        "Email": "string",
        "Designation": "string",
        "CreatedAt": "date",
        "Department": {
            "DepartmentName": "string"
        },
        "Manager": {
            "EmployeeID": "number",
            "FirstName": "string",
            "LastName": "string",
            "Designation": "string",
            "Email": "string"
        }
    },
    "message": "Employee retrieved successfully"
}
```

**Error Response (404 Not Found):**
```json
{
    "success": false,
    "message": "Employee not found"
}
```

## Error Responses

All endpoints may return these error responses:

**403 Forbidden:**
```json
{
    "success": false,
    "message": "Access denied. Insufficient permissions."
}
```

**401 Unauthorized:**
```json
{
    "success": false,
    "message": "Access denied. No token provided."
}
```

**500 Internal Server Error:**
```json
{
    "success": false,
    "message": "Error message",
    "error": "Detailed error information"
}
```
```

This documentation covers:
- Authentication endpoints (login, signup)
- Employee endpoints (get all, get by ID)
- Request/Response formats
- Error handling
- Authorization requirements
- Query parameters
- Response status codes
