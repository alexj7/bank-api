# RETORNA API

This project is a basic HTTP API for a fake financial institution, designed to manage bank accounts and handle transactions. It is built using Node.js with TypeScript and MongoDB with Mongoose.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB

## Setup

1. Clone the repository:
    ```bash
    git clone http://retorna-3-ebanxz@git.codesubmit.io/retorna-3/retorna-banking-api-xpijed
    cd bank-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project with the following content:
    ```env
    PORT=
    DB_URL=
    ```

## Running the Project

1. Start the MongoDB server:
    ```bash
    mongod
    ```

2. Run the project in development mode:
    ```bash
    npm run dev
    ```

## Project Structure

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
| |-- __tests__/
|   |-- *.test.ts
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
| |-- __tests__/
|   |-- *.test.ts
|
|-- index.ts
