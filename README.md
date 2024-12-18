# Todo

This is a **Full-Stack Todo Application** built using the MERN stack (MongoDB, Express, React, Node.js). The application is includes features like user authentication, creating, updating, and deleting todos. The backend is written in TypeScript, and the frontend is built with React.

## Features

- **User Authentication**: Signup and login with JWT authentication.
- **Todo Management**: Create, retrieve, update, and delete todos.
- **Multi-User Support**: Each user can manage their own todos.
- **Fully Containerized**: Dockerized frontend, backend, and database services for easy deployment.
- **RESTful API**: Backend services exposed via a REST API.

---

## Technologies Used

### Frontend:

- **React**: UI development.
- **Vite**: Fast development server.
- **TypeScript**: Type-safe development.
- **Tailwind CSS**: For styling.

### Backend:

- **Node.js**: JavaScript runtime.
- **Express.js**: Backend framework.
- **TypeScript**: Type-safe server logic.
- **MySQL**: SQL database.

---

## Project Structure

```
project-root/
|-- web/                # Frontend code
|   |-- src/            # React components, hooks, etc.
|-- api/                # Backend code
|   |-- src/            # API routes, models, controllers, etc.
|-- README.md           # Project documentation
```

---

## Setup and Installation


1. Clone the repository:

   ```bash
   git clone https://github.com/nurmandev/Todo-App
   cd Todo-App
   ```

2. Set up the backend:

   ```bash
   cd api
   npm install
   npm run dev
   ```

3. Set up the frontend:

   ```bash
   cd web
   npm install
   npm run dev
   ```

4. Start MySQl (if not running via Docker).

---

## Environment Variables

Create `.env` files for both frontend and backend to configure environment-specific variables.

### Backend `.env` example:

```env
  DB_HOST
  DB_USERNAME
  DB_PASSWORD
  PORT
  DB_PORT
  DB_NAME
  SECRET_KEY
  EXPIRE_TIME
  EMAIL_ADDRESS
  EMAIL_PASSWORD
  ```
