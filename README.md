# User Service

A RESTful API microservice for user management, authentication, and permissions. Built with Node.js, Express, and MongoDB.

## Features

- User registration with OTP email verification
- Secure login and JWT-based authentication (access & refresh tokens)
- Permission management for admin/superuser
- Rate limiting and error handling
- Modular code structure for easy extension

## Technologies

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Winston (logging)
- Zod (validation)

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/usersvc.git
    cd usersvc
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Configure environment variables (see below).

### Environment Variables

Set the following variables in a `.env` file or your environment:

- `HTTP_PORT` - Port for HTTP server (default: 3000)
- `HTTP_HOST` - Host for HTTP server (default: localhost)
- `LOG_PATH` - Path for log files (default: /var/log)
- `MONGO_URL` - MongoDB connection string
- `RUNTIME` - "dev" or "prod"
- `SECRET` - Secret key for JWT signing

Example `.env`:
```
HTTP_PORT=3000
HTTP_HOST=localhost
LOG_PATH=/var/log
MONGO_URL=mongodb://localhost:27017/usersvc
RUNTIME=dev
SECRET=your_jwt_secret
```

### Running the Service

```sh
npm start
```

The server will run at `http://HTTP_HOST:HTTP_PORT`.

### Health Check

- `GET /ping`  
  Returns "PONG"

## Error Handling

Standard HTTP status codes and error messages are returned for all endpoints.  
Custom errors:  
- 400 Bad Request  
- 401 Unauthorized  
- 404 Not Found  
- 409 Conflict  
- 500 Internal Server Error

## Project Structure

```
src/
  application/services/      # Business logic
  infrastructure/            # Config, logger, database
  interfaces/http/           # Controllers, DTOs, routes, middlewares
  shared/                    # Common utilities and error classes
```

## Development

- Logging is verbose in `dev` mode.
- Rate limiting is enabled (50 requests/minute).
- OTP codes expire after 2 minutes.

## License

MIT

## Maintainer

For issues or questions, open an issue or contact [maintainer@example.com](mailto:maintainer@example.com).