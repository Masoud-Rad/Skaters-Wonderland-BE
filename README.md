SKATERS-WONDERLAND API
Project Overview
Tech Stack Typescript, Expres.js, Node.js, PostgreSQL, Jest

This repo is a RESTful API that serves as the backend architecture for a Reddit-style SKATERS-WONDERLAND Web Application. It is built using Node.js and Express.js and uses PostgreSQL as its database. The API allows users to interact with the application by performing full CRUD (Create, Read, Update, Delete) operations on lands, comments, and users.


This API will serve as the backend for a frontend project built with React.js.


A live version of this app is available here, hosted with Render. A list of available endpoints can be found here.


Setup
Follow the instructions below to get started


Minimum requirements:
Node.js: v18.15.0
PostgreSQL: v15.2

Clone this repository locally
In your terminal, create a new directory:

$ mkdir <new-directory-name>
Navigate to this directory:

$ cd <new-directory-name>
Clone this repository:

$ git clone https://github.com/gsaltuk/be_nc_news_project.git

Install dependencies
$ npm install

/*
"devDependencies": {
    "@babel/core": "^7.22.10",
    "@babel/preset-env": "^7.22.10",
    "@babel/preset-typescript": "^7.22.5",
    "@types/jest": "^29.5.3",
    "babel-jest": "^29.6.2",
    "jest": "^29.6.2",
    "supertest": "^6.3.3",
    "ts-node": "^10.9.1"
  }, 
  "dependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^20.4.9",
    "@types/supertest": "^2.0.12",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "fs.promises": "^0.1.2",
    "http-errors": "^2.0.0",
    "pg": "^8.11.2",
    "pg-format": "^1.0.4"
  },
*/

Create and setup environment variables
Create two .env files:

$ touch .env.development
$ touch .env.test
.env.development should contain the following:-

PGDATABASE= dbName
.env.test should contain the following:-

PGDATABASE= dbName_test

Create and seed the databases
Run the following code to setup and seed both the development and test databases:

$ npm run setup-dbs
$ npm run seed

API Endpoints
Users are able to access and interact with the data using the following endpoints:

GET /api/users
Returns a list of users

GET /api/users/?username
Returns an object of a specipic user's info

GET /api/lands
Returns a list of lands
Can be used with optional queries sort_by & city


GET /api/lands/:land_id
Returns the specified land

GET /api/lands/:land_id/comments
Returns a list of comments from a specified land

POST /api/lands/:land_id/comments
Inserts a comment into the specified land and returns comment

PATCH /api/lands/:land_id
Updates a specified lands vote count and returns updated land

DELETE /api/comments/:comment_id

Deletes specified comment

Delete land. /api/lands/:land_id

NOTICE: If you run tsc, make sure before run the test, delete all js file in folder of "__test__" to prevent dublicate test-file 

