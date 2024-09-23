# Simple Blog Platform

This is a fullstack blog platform built using **Django/DRF** (Core Service), **FastAPI** (Microservice), **Vue.js** (Frontend), and **PostgreSQL**. The platform allows user authentication, blog post management, and comment management, all containerized using **Docker** and orchestrated using **Docker Compose**.

## Features

- JWT-based user authentication
- CRUD operations for blog posts (Django/DRF)
- CRUD operations for comments (FastAPI)
- Pagination and search for blog posts
- Vue.js frontend with Pinia state management and client-side pagination
- Dockerized with Docker Compose

## Tech Stack

- **Backend (Core Service)**: Django, Django Rest Framework, PostgreSQL
- **Microservice**: FastAPI, SQLAlchemy, PostgreSQL
- **Frontend**: Vue.js (TypeScript), Pinia for state management
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

## Setup Instructions

### Prerequisites

- Install [Docker](https://docs.docker.com/get-docker/)
- Install [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Project

To set up and run the project using Docker Compose, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ziadab/paylik_task.git
   cd paylik_task
   ```

2. Create a `.env` file for the Django core service in the `core` directory and add your environment variables:

   ```bash
   DB_USER=
   DB_PASSWORD=
   DB_HOST=
   DB_PORT=
   DB_NAME=
   JWT_ALGORITHM=
   JWT_SECRET=
   REDIS_URL=
   ```

3. Create a `.env` file for the FastApi service in the `comments` directory and add your environment variables:

   ```bash
    POSTGRESQL_URL=
    JWT_ALGORITHM=
    JWT_SECRET=
   ```

4. Create a `.env` file for the Frontend service in the `frontend` directory and add your environment variables:

   ```bash
    VITE_API_URL=http://localhost:8000/
    VITE_COMMENT_API_URL=http://localhost:8001/
   ```

5. Build and run the services with Docker Compose:

   ```bash
   docker-compose up --build
   ```

6. Access the services at:

   - **Frontend (Vue.js)**: [http://localhost:8080](http://localhost:8080)
   - **Django Core Service**: [http://localhost:8000](http://localhost:8000)
   - **FastAPI Microservice**: [http://localhost:8001](http://localhost:8001)

7. To stop the services:

   ```bash
   docker-compose down
   ```

## API Documentation

Both services expose their API documentation at the `/docs` endpoint.

- **Core Service (Auth) Docs**: http://localhost:8000/docs
- **Blog Service Docs**: http://localhost:8001/docs

### Assumptions and Design Decisions

- **Same Database for Microservice**: The FastAPI and DRF microservices share a common database to ensure seamless access to user and blog data, allowing FastAPI to validate users and verify blog existence directly. This reduces the need for complex inter-service communication, maintaining data consistency and integrity across both services. This approach ensures efficiency while allowing for scalability in the future.
- **JWT Authentication**: The JWT tokens are issued by the Django core service and used by the FastAPI microservice for user authentication.
- **Pagination**: Blog posts and comments are paginated to improve performance and user experience.
- **Containerization**: Each service (frontend, core, microservice) is containerized using Docker for ease of development and deployment.
