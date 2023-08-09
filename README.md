SKATERS-WONDERLAND API
Project Overview
Tech Stack Typescript, Expres.js, Node.js, PostgreSQL

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
$ npm install -D jest
$ npm install -D jest-sorted

Create and setup environment variables
Create two .env files:

$ touch .env.development
$ touch .env.test
.env.development should contain the following:-

PGDATABASE=nc_news
.env.test should contain the following:-

PGDATABASE=nc_news_test

Create and seed the databases
Run the following code to setup and seed both the development and test databases:

$ npm run setup-dbs
$ npm run seed

API Endpoints
Users are able to access and interact with the data using the following endpoints:

GET /api/lands

Returns a list of lands
Can be used with optional queries sort_by & city

GET /api/users

Returns a list of users

GET /api/lands/:land_id

Returns the specified land

GET /api/lands/:land_id/comments

Returns a list of comments from a specified land

POST /api/lands/:land_id/comments

Inserts a comment into the specified land and returns comment
Example request body:-
{   "username": "butter_bridge",
    "body": "Totally agree, thank you for posting this" };
Example response:-
{   "comment_id": 19,
    "body": "Totally agree, thank you for posting this",
    "land_id": 1,
    "username": "butter_bridge",
    "created_at": "2023-05-14T07:34:30.053Z"    };

PATCH /api/lands/:land_id

Updates a specified lands vote count and returns updated land
Example request body:-
{ "inc_vote": 1 }
Example response:-
{   "land_id": 1,
    "landName": "Living in the shadow of a great man",
    "city": "Salford",
    "country": "UK",
    "description": "I find this existence challenging",
    "created_at": "2020-07-09T20:11:00.000Z",
    "vote": 101,
    "land_img_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"  };

DELETE /api/comments/:comment_id

Deletes specified comment

Delete land. /api/lands/:land_id

