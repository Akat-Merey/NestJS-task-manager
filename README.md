# Task Manager API

A REST API built with NestJS. Supports user authentication and personal task management.

## Stack

- NestJS
- JWT Authentication
- In-memory storage (no database)

## Setup

```bash
npm install
npm run start:dev
```

Server runs on `http://localhost:3000`

## Endpoints

### Auth
| Method | URL | Description |
|--------|-----|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login and get token |

### Tasks (requires Authorization header)
| Method | URL | Description |
|--------|-----|-------------|
| POST | /tasks | Create a task |
| GET | /tasks | Get your tasks |
| GET | /tasks/:id | Get one task |
| PATCH | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## Authentication

After login, add this header to every task request:

```
Authorization: Bearer YOUR_TOKEN
```

## Task Status Values

`PENDING` `IN_PROGRESS` `DONE`