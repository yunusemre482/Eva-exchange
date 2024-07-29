# EvaExchange Backend

EvaExchange is an arbitrarily trading game developed by Super Traders to educate users on the terminology used in trading shares. This backend application handles the core trading logic and uses a RESTful API to manage BUY and SELL operations. The frontend application is managed by another team and is out of scope for this project.

## Features

- Register shares with unique symbols (3 capital letters).
- Allow users to update share prices hourly (exactly 2 decimal digits).
- Ensure users have a portfolio before trading.
- Support BUY and SELL trades with specific conditions.

## Technology Stack

- **Backend**: Node.js with Nest.js framework
- **Database**: PostgreSQL
- **ORM**: Prisma

## Prerequisites

- Docker and Docker Compose
- Node.js (if running locally)

## Docker setup 


1. **Start Docker compose**
   ```bash
      docker compose up -d 
   ```

## Setup

1. **Clone repository**

   ```bash
      git clone https://github.com/yunusemre482/Eva-exchange.git

   ```

2. **Install dependencies**
    ```bash
      cd Eva-exchange
      npm install
    ```


3. **Initialize Database**
    ```bash
      npm run migrate:dev
    ```

4. **Create Fake Dataset**
    ```bash
      npm run faker:generate 
    ```

5. **Run the application**
    ```bash
      npm run start:dev
    ```

## API Endpoints

The application follows the RESTful API principles. Below are the main endpoints available:
- **Auth**
  - `GET /api/v1/auth/login` - Login with user
  - `GET /api/v1/auth/register` - Register for new User

  
- **Users**
  - `GET /api/v1/users/increase/balance` - Increase user balance
  - `GET /api/v1/users/decrease/balance` - Decrease user balance

- **Trades**
  - `GET  /api/v1/trades`       - List all trades
  - `GET  /api/v1/trades/user`  - Get user trades
  - `POST /api/v1/trades/buy`   - Create BUY trade
  - `POST /api/v1/trades/sell`  - Create SELL trade

- **Portfolios**
  - `GET  /api/v1/portfolios/user` - Get User Portfolios
  - `POST /api/v1/portfolios` - Create new Portfolio

## API Documentation - (Postman Collection)

You can find the API documentation at the following
link: [API Documentation](https://www.postman.com/yunusemre482/workspace/eva-exchange)
# turkai
