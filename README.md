
```markdown
# Web Application with Microservices and Consul

This project implements a **microservices architecture** with **Spring Boot** for the backend and **React** for the frontend. It uses **Consul** for service discovery.

### Key Components
- **Spring-Security**: JWT authentication service.
- **Sales-Manager**: Manages sales and transactions.
- **Product-Service**: Manages product data.
- **Demo**: A sample microservice for integration testing.

### Core Technologies
- **Spring Boot** for backend services.
- **React** for frontend.
- **JWT** for authentication.
- **MySQL** for database.
- **Consul** for service discovery.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/samyrh/Consul-Microservices-Jwt.git
cd Consul-Microservices-Jwt
```

### 2. Install and Run Backend Services

Ensure **Consul** and **MySQL** are installed and running locally for service discovery and database functionality.

#### Run Consul (Service Discovery)

- Download and install Consul from [Consul Downloads](https://www.consul.io/downloads).
- Start Consul:

  ```bash
  consul agent -dev
  ```

- Access the Consul UI at [http://localhost:8500](http://localhost:8500).

#### Set up MySQL

- Download and install MySQL from [MySQL Downloads](https://dev.mysql.com/downloads/installer/).
- Start MySQL and create the necessary databases (e.g., `product_service_db`, `sales_manager_db`).

#### Run Microservices

Navigate to each microservice and run:

```bash
mvn spring-boot:run
```

Repeat this for **Spring-Security**, **Sales-Manager**, **Product-Service**, and **Demo**.

### 3. Run the Frontend

#### Install Dependencies

```bash
cd Front-End
npm install
```

#### Configure React to Run on Port 3000

Make sure `.env` contains:

```bash
PORT=3000
```

#### Start Frontend

```bash
npm start
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

### 4. JWT Authentication

1. **Login to Get JWT Token** (POST to `http://localhost:8081/login`):

   ```json
   {
     "username": "your-username",
     "password": "your-password"
   }
   ```


## Contribution

1. Fork the repo.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push your branch (`git push origin feature-name`).
5. Open a pull request.

## License

MIT License. See the [LICENSE](LICENSE) file for details.
```
