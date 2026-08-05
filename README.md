# ServiceAgent Assessment — Complaint Intake Dashboard

Full-stack take-home style app for capturing customer complaints and triaging them in an admin dashboard.

## Overview

Public users submit a complaint (name, email, message). Admins review the queue, filter by status, mark items resolved, or delete them. Built as a clean split of React frontend + Express/Postgres backend.

## Features

- Public complaint form (`/form`)
- Admin dashboard (`/admin`) with list, status filter, resolve toggle, and delete
- REST API: `POST / GET / PATCH / DELETE` on `/complaints`
- Status workflow: Pending ↔ Resolved

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 19, TypeScript, Vite, React Router, Tailwind CSS 4 |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL (`pg`) |

## Project Structure

```
client/   # Vite React app
server/   # Express API + Postgres
```

## Setup

**Prerequisites:** Node.js 18+, PostgreSQL

### Backend

```bash
cd server
npm install
# .env → DATABASE_URL=postgres://...
# optional: PORT=3001
npm start
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Client expects the API at `http://localhost:3001`.

## Design Tradeoffs

- **PostgreSQL** — relational clarity and easy status queries over a lighter store
- **React + TypeScript** — type-safe UI for admin workflows
- **Tailwind** — fast layout iteration for a compact assessment UI

## Possible Extensions

- Authentication for the admin surface
- Email notifications on new / resolved complaints
- Analytics on volume and time-to-resolve

## Applications

- Customer support intake prototypes
- Full-stack CRUD assessment demonstrating React + Express + Postgres
