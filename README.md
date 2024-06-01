# Real Time Bidding System

This project is a real-time bidding system built with Node.js, Express, Sequelize, and Socket.io. The application allows users to place bids on items and receive real-time notifications when new bids are placed.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed
- MySQL installed and running

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/sebi-bano/real-time-bidding.git
cd real_time_bidding
```

Install dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```
Set Up the Database
Ensure your MySQL server is running and create a new database: 

## Configuration

Create a .env file in the root directory and add the following environment variables:
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=your_database