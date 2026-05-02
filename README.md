# Interview Experiences - Backend Architecture

This repository contains the RESTful API backend for the **Interview Experiences** platform. Designed for scalability and maintainability, it leverages a multi-tier architecture to securely handle user authentication, post curation, comment interactions, and asynchronous email delivery.

## Technical Architecture

Built on **Node.js** and **Express.js**, the backend implements a robust design pattern separating the HTTP layer from business logic and data access.

### Key Architectural Decisions

- **Multi-Layered Pattern**:
  - **Controllers**: Handle HTTP requests, responses, and payload validation.
  - **Services**: Encapsulate the core business logic, keeping controllers thin.
  - **Repositories**: Abstract the data access layer, executing database operations via the ORM.
- **Database Design**: Uses **MySQL** with **Sequelize ORM**. The schema includes complex associations (Users, Roles, Posts, Companies, Comments, Votes) optimized with cascading relationships.

- **Asynchronous Task Queue (RabbitMQ)**: 
  - Heavy or blocking tasks (such as sending account verification emails via **Nodemailer**) are offloaded to an AMQP message broker (**RabbitMQ**). 
  - Background workers process these queues, ensuring API response times remain instantaneous for the end-user.
- **Redis for State & Rate Limiting**: 
  - **Redis** is utilized for temporarily storing user details (such as email) securely during the account verification process.
  - It also powers targeted IP-based rate limiting on specific endpoints, like the "resend verification link" route, to prevent email spam and API abuse.
- **Security & Authentication**: 
  - Stateless authentication utilizing **JWT (JSON Web Tokens)**.
  - Passwords are cryptographically hashed via **Bcrypt**.

## Directory Structure

```text
src/
├── config/       # Environment and database configurations
├── controllers/  # Route handlers mapping requests to services
├── middleware/   # Express middlewares (Auth guards, Rate limiters)
├── models/       # Sequelize models and relationships definitions
├── repositories/ # Data access abstraction layer
├── routes/       # Express route definitions (API v1)
├── services/     # Core business logic
└── workers/      # RabbitMQ consumers for email delivery tasks
```

## API Routes (v1)

The API is versioned (e.g., `/api/v1/`) and structurally divided into logical domains:
- `/auth`: Registration, Login, Email Verification.
- `/posts`: CRUD for interview experiences, including upvote/downvote actions.
- `/comments`: Core comment handling for posts.
- `/companies`: Managing company metadata.

## Setup & Scripts

Ensure Node.js (v18+), MySQL, Redis, and RabbitMQ are running locally or accessible via network.

```bash
# Install dependencies
npm install

# Run database migrations
npx sequelize-cli db:migrate

# Start the development server (Nodemon)
npm run dev
```

**Environment Variables:**
Requires a `.env` file specifying `DB_*`, `REDIS_URL`, `RABBITMQ_URL`, `JWT_SECRET`, and `SMTP_*` credentials.
