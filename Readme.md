# University Management System Authentication Service

This is the documentation for the Authentication Service component of the University Portal Management System. The Authentication Service provides authentication and authorization functionalities for the three main roles in the system: Admin, Student, and Faculty. It is built using TypeScript, Express.js, Zod validation, and MongoDB.

## Live website link

[Base API URL](https://university-auth-backend-sandy.vercel.app/)
[https://university-auth-backend-sandy.vercel.app/](https://university-auth-backend-sandy.vercel.app/)

## Functional Requirements

### Student

- Student can login and log out.
- Student can manage and update their profile.
- Student can update certain fields.

### Admin

- Admin can log in and log out.
- Admin can manage and update their profile.
- Admin can only update certain fields.
- Admin can manage user accounts:
  - Change Password

### Faculty

- Faculty can log in and log out.
- Faculty can manage and update their profile.
- Faculty can only update certain fields.

## API Endpoints

### User

- `POST api/v1/users/create-student`
- `POST api/v1/users/create-faculty`
- `POST api/v1/users/create-admin`

### Student

- `GET api/v1/students`
- `GET api/v1/students?searchTerm=fr797`
- `GET api/v1/students?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET api/v1/students/:id`
- `PATCH api/v1/students/:id`
- `DELETE api/v1/students/:id`

### Faculty

- `GET api/v1/faculties`
- `GET api/v1/faculties?searchTerm=john`
- `GET api/v1/faculties?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET api/v1/faculties/:id`
- `PATCH api/v1/faculties/:id`
- `DELETE api/v1/faculties/:id`

### Admin

- `GET api/v1/admins`
- `GET api/v1/admins?searchTerm=us88`
- `GET api/v1/admins?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET api/v1/admins/:id`
- `PATCH api/v1/admins/:id`
- `DELETE api/v1/admins/:id`

### Academic Semester

- `POST api/v1/academic-semesters/create-semester`
- `GET api/v1/academic-semesters`
- `GET api/v1/academic-semesters?searchTerm=fal`
- `GET api/v1/academic-semesters?page=1&limit=10&sortBy=year&sortOrder=asc`
- `GET api/v1/academic-semesters/:id`
- `PATCH api/v1/academic-semesters/:id`
- `DELETE api/v1/academic-semesters/:id`

### Academic Department

- `POST api/v1/academic-departments/create-department`
- `GET api/v1/academic-departments`
- `GET api/v1/academic-departments?searchTerm=math`
- `GET api/v1/academic-departments?page=1&limit=10&sortBy=title&sortOrder=asc`
- `GET api/v1/academic-departments/:id`
- `PATCH api/v1/academic-departments/:id`
- `DELETE api/v1/academic-departments/:id`

### Academic Faculty

- `POST api/v1/academic-faculties/create-faculty`
- `GET api/v1/academic-faculties`
- `GET api/v1/academic-faculties?searchTerm=com`
- `GET api/v1/academic-faculties?page=1&limit=10&sortBy=title&sortOrder=asc`
- `GET api/v1/academic-faculties/:id`
- `PATCH api/v1/academic-faculties/:id`
- `DELETE api/v1/academic-faculties/:id`

### Authentication

- `POST api/v1/auth/login`
- `POST api/v1/auth/change-password`
- `POST api/v1/auth/refresh-token`
