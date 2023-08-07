# Node.js Backend with MySQL and Sequelize

This repository contains a Node.js backend application with MySQL database integration using Sequelize as the ORM. The application provides endpoints for registration, login and data retrieval.

## Framework and Technologies Used

- Node.js for the backend server
- MySQL for the database
- Sequelize as the Object-Relational Mapping (ORM)
- Docker Compose for easy setup and deployment

## Database Schema

The database schema consists of two main entities: `Users` and `Data`. The `Users` table stores user registration information, while the `Data` table stores data records.

### Users Table

| Column      | Type         | Nullable | Key          | Extra       |
|-------------|--------------|----------|--------------|-------------|
| user_id     | INT          | ❌        | PRIMARY      | auto-increment |
| username    | VARCHAR(45)  | ❌        | UNIQUE(users_UN) |             |
| email       | VARCHAR(45)  | ❌        | UNIQUE(email_UNIQUE) |         |
| password    | VARCHAR(100) | ✔️       |              |             |
| full_name   | VARCHAR(100) | ❌        |              |             |
| gender      | VARCHAR(10)  | ❌        |              |             |
| age         | INT          | ✔️       |              |             |
| created_at  | BIGINT       | ❌        |              |             |

Indexes:
- PRIMARY (user_id)
- email_UNIQUE (email)
- users_UN (username)


### Data Table

| Column  | Type         | Nullable | Key     | Extra       |
|---------|--------------|----------|---------|-------------|
| key     | VARCHAR(100) | ❌        | PRIMARY |             |
| value   | VARCHAR(100) | ❌        |         |             |

Indexes:
- PRIMARY (key)


## Instructions to Run the Code

To run the code, follow these steps:

1. Install Docker on your system if not already installed.

2. Clone this repository:
   ```sh
   git clone https://github.com/aks1809/dpd-zero.git
   cd dpd-zero
   docker-compose up -d
   ```
3. Your application is up and running on port 9000


## Instructions to setup the code

The code is setup by container itself, to make API calls query from postman by restoring the postman dump provided with the filename `DPD.postman_collection.json` OR make api calls on endpoints such as:

```
    http://localhost:9000/api/register
    http://localhost:9000/api/data
```