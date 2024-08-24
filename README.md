# NestJS Project with Prisma and MySQL

## Overview

This project is a NestJS application using Prisma for ORM and MySQL as the database. It includes modules for user management and project management, with role-based access control. The application allows you to create, read, update, and delete users and projects.

## Prerequisites

- **Node.js**: Version 14.x or higher
- **MySQL**: Ensure MySQL is installed and running
- **Prisma CLI**: Required for managing database migrations and schema

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-repository.git
cd your-repository
```
## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env `file in the root directory and configure your database connection. Example:

```bash
DATABASE_URL="mysql://username:password@localhost:3306/your_database"

WT_SECRET='your-jwt-token'
```
Replace username, password, localhost, 3306, and your_database with your MySQL credentials and database details and your-jwt-token as well. 

## Setup Prisma

### Generate Prisma Client

```bash
npx prisma generate
```
### Run Migrations
Make sure your database schema is up-to-date:

```bash 
npx prisma migrate dev --name init
```
##  Running the Application
To start the application, use:

```bash
npm run start:dev
```
The application will run on http://localhost:3000 by default.

