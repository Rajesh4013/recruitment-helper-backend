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
Create a new user (requires authentication and Recruiter role).

```http
POST /auth/signup
Authorization: Bearer {token}
```

**Request Body:**
```json
{
    "employeeId": "number",
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

### Create Employee
Create a new employee (requires authentication and Recruiter role).

```http
POST /employees
Authorization: Bearer {token}
```

**Request Body:**
```json
{
    "employeeId": "number",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "designation": "string" (optional),
    "departmentId": "number" (optional)
}
```

**Response (201 Created):**
```json
{
    "success": true,
    "data": {
        "EmployeeID": "number",
        "FirstName": "string",
        "LastName": "string",
        "Email": "string",
        "Designation": "string",
        "DepartmentID": "number",
        "CreatedAt": "date"
    },
    "message": "Employee created successfully"
}
```

### Get All Employees
Get a list of all employees (requires authentication).

```http
GET /employees
Authorization: Bearer {token}
```

**Query Parameters:**
- `page`: number (optional, default: 1)
- `limit`: number (optional, default: 10)
- `search`: string (optional) - Search in FirstName, LastName, Email
- `employeeId`: string (optional) - Search by partial employee ID
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

## Departments

### Get All Departments
Get a list of all departments (requires authentication).

```http
GET /departments
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "DepartmentID": "number",
            "DepartmentName": "string"
        }
    ],
    "message": "Departments retrieved successfully"
}
```

### Get Department by ID
Get details of a specific department.

```http
GET /departments/:id
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "DepartmentID": "number",
        "DepartmentName": "string"
    },
    "message": "Department retrieved successfully"
}
```

## Skills

### Get All Skills
Get a list of all skills with search and pagination (requires authentication).

```http
GET /skills
Authorization: Bearer {token}
```

**Query Parameters:**
- `page`: number (optional, default: 1)
- `limit`: number (optional, default: 10)
- `search`: string (optional) - Search in SkillName
- `sortBy`: string (optional, default: 'SkillName')
- `sortOrder`: 'asc' | 'desc' (optional, default: 'asc')

**Response (200 OK):**
```json
{
    "success": true,
    "data": [
        {
            "SkillID": "number",
            "SkillName": "string"
        }
    ],
    "message": "Skills retrieved successfully",
    "pagination": {
        "total": "number",
        "page": "number",
        "limit": "number"
    }
}
```

### Get Skill by ID
Get details of a specific skill.

```