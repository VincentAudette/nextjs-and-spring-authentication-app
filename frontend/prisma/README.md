# Next.js & Prisma SQLite Authentication

A simple example of a Next.js application that uses Prisma with an SQLite database to implement authentication.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Setup

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

3. Create and initialize your SQLite database:

   ```bash
   npx prisma migrate dev --name init --preview-feature
   ```

   This command will create a new SQLite database file named `dev.db` in the `prisma` directory of your project.

4. Start the development server:

   ```bash
   npm run dev
   ```

## Features

- User registration, login, and role-based access control (RBAC)
- Password hashing with bcrypt
- SQLite database with Prisma

## Usage

The following API routes are available:

- `POST /api/register`: Register a new user
- `POST /api/login`: Log in a user
- `[route] /api/[your endpoint]`: Custom API route with role-based access control

To register a new user, make a POST request to `/api/register` with the following JSON payload:

```json
{
  "email": "example@example.com",
  "password": "yourpassword",
  "role": "ADMIN"
}
```

To log in, make a POST request to `/api/login` with the following JSON payload:

```json
{
  "email": "example@example.com",
  "password": "yourpassword"
}
```

## Project Structure

- `/pages/api`: Contains all the API routes
- `/prisma`: Contains Prisma setup and configuration files

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

---

Remember to replace `https://github.com/username/project-name.git` with the actual Git URL for your project.