# University Portal Management System Authentication Service

This is the documentation for the Authentication Service component of the University Portal Management System. The Authentication Service provides authentication and authorization functionalities for the three main roles in the system: Admin, Student, and Faculty. It is built using TypeScript, Express.js, Zod validation, and MongoDB.

## Live website link

[Live base API link](https://university-auth-backend-sandy.vercel.app/)
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

- `POST api/v1/user/create-student`
- `POST api/v1/user/create-faculty`
- `POST api/v1/user/create-admin`

### Student

- `GET api/v1/student`
- `GET api/v1/student?searchTerm=fr797`
- `GET api/v1/student?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET api/v1/student/:id`
- `PATCH api/v1/student/:id`
- `DELETE api/v1/student/:id`

### Faculty

- `GET api/v1/faculty`
- `GET api/v1/faculty?searchTerm=john`
- `GET api/v1/faculty?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET api/v1/faculty/:id`
- `PATCH api/v1/faculty/:id`
- `DELETE api/v1/faculty/:id`

### Admin

- `GET api/v1/admin`
- `GET api/v1/admin?searchTerm=us88`
- `GET api/v1/admin?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET api/v1/admin/:id`
- `PATCH api/v1/admin/:id`
- `DELETE api/v1/admin/:id`

### Academic Semester

- `POST api/v1/academic-semester/create-semester`
- `GET api/v1/academic-semester`
- `GET api/v1/academic-semester?searchTerm=fal`
- `GET api/v1/academic-semester?page=1&limit=10&sortBy=year&sortOrder=asc`
- `GET api/v1/academic-semester/:id`
- `PATCH api/v1/academic-semester/:id`
- `DELETE api/v1/academic-semester/:id`

### Academic Department

- `POST api/v1/academic-department/create-department`
- `GET api/v1/academic-department`
- `GET api/v1/academic-department?searchTerm=math`
- `GET api/v1/academic-department?page=1&limit=10&sortBy=title&sortOrder=asc`
- `GET api/v1/academic-department/:id`
- `PATCH api/v1/academic-department/:id`
- `DELETE api/v1/academic-department/:id`

### Academic Faculty

- `POST api/v1/academic-faculty/create-faculty`
- `GET api/v1/academic-faculty`
- `GET api/v1/academic-faculty?searchTerm=com`
- `GET api/v1/academic-faculty?page=1&limit=10&sortBy=title&sortOrder=asc`
- `GET api/v1/academic-faculty/:id`
- `PATCH api/v1/academic-faculty/:id`
- `DELETE api/v1/academic-faculty/:id`

### Authentication

- `POST api/v1/auth/login`
- `POST api/v1/auth/change-password`
- `POST api/v1/auth/refresh-token`
