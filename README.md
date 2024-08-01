# BANK API

This project is a basic HTTP API for a fake financial institution, designed to manage bank accounts and handle transactions. It is built using Node.js with TypeScript and MongoDB with Mongoose.

## Description

This API use MongoDB for its flexibility, scalability, and efficient querying capabilities, making it well-suited for handling the dynamic data requirements of a financial application. Instead of storing account balances directly on db, balances are calculated in real-time from the transaction history. This ensures accuracy, consistency, and transparency, as every transaction is accounted for in the balance calculation, facilitating easier auditing and reducing the risk of discrepancies.


## Prerequisites

- Node.js (v18 or higher)
- MongoDB

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/alexj7/bank-api.git
    cd bank-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project with the values specified in `.env.example`:
    ```**env**
    PORT=
    DB_URL=
    ```

## Running the Project

Base URL to test: http://localhost:3000/api

1. Run the project in development mode:
    ```bash
    npm run dev
    ```

2. Run tests:
    ```bash
    npm run test
    ```

3. Build the project for production:
    ```bash
    npm run build
    ```

4. Run the project in production mode:
    ```bash
    npm start
    ```

## API Documentation

The API documentation is available at the following link: [API Documentation](https://documenter.getpostman.com/view/4977734/2sA3kd9xAL#88de8d04-97bc-4665-a2d0-7b4ece6f953c)

## Project Structure

```
src/
|-- controllers/
| |-- accountController.ts
| |-- customerController.ts
| |-- transactionController.ts
| |-- __tests__/
|   |-- *.test.ts
|
|-- models/
| |-- account.ts
| |-- customer.ts
| |-- transaction.ts
|
|-- routes/
| |-- router.ts
| |-- routesPath.ts
|
|-- services/
| |-- accountService.ts
| |-- customerService.ts
| |-- transactionService.ts
| |-- __tests__/
|   |-- *.test.ts
|
|-- types/
| |-- *.d.ts
|
|-- utils/
| |-- *.ts
| |-- index.ts
|
|-- index.ts
```