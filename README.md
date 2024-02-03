# SKATERS-WONDERLAND


SKATERS-WONDERLAND is a platform that brings together skaters, trainers, and skate enthusiasts to explore and share great skating spots, connect with like-minded individuals, and discover local skate businesses and sell your second-hand skating gear.


## Features

- Explore and discover skating spots in your area.
- Share your favorite skating locations and provide details about safety, suitability, and cost.
- Connect with trainers, find skating buddies, and plan group sessions.
- Advertise skate businesses for free and browse second-hand skating gear listings.
- Leave reviews for businesses and trainers to help others make informed decisions.
- Location-based search to find spots and users near you.
- Messaging feature to connect with other users.



# SKATERS-WONDERLAND Back-End (SKATERS-WONDERLAND-BE)

This is the SKATERS-WONDERLAND Back-End repository! This is where the server-side logic of the SKATERS-WONDERLAND app resides.

## Technologies Used

- Typescript
- Node.js
- Express.js
- PostgreSQL
- Jest (for unit testing)

## Installation and Setup

1. Clone this repository: `git clone https://github.com/Masoud-Rad/Skaters-Wonderland-BE`
2. Navigate to the project directory: `cd SKATERS-WONDERLAND-BE`
3. Install dependencies: `npm install`
4. Create and setup environment variables Create two .env files:
    - $ touch .env.development  
    (Should contain : PGDATABASE= dbName )
    - $ touch .env.test  
    (Should contain : PGDATABASE= dbName.test )   
5. Create and seed the databases Run the following code to setup and seed both the development and test databases:
    - $ npm run setup-dbs 
    - $ npm run seed
6. Start the development server: `npm start`
7. The server will be running at `http://localhost:9090`.


## API Documentation

API Endpoints Users are able to access and interact with the data using the following endpoints:

## API Documentation

API Endpoints Users are able to access and interact with the data using the following endpoint:

- **GET /api/getEndpoints**
  - **Description:** Serves up a JSON representation of all the available endpoints of the API.
  - **Example:** You can view the detailed list of endpoints by checking the [endpoints.json](https://github.com/Masoud-Rad/Skaters-Wonderland-BE/blob/main/endpoints.json) file.




### A live version of this app is available here, hosted with Render. A list of available endpoints can be found here:
`https://dashboard.render.com/web/srv-cjei90ocfp5c73f0s3pg`


## Contributing

Contributions are welcome! If you'd like to contribute to the SKATERS-WONDERLAND Back-End, please follow the usual steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m "Add some feature"`
4. Push your changes to the branch: `git push origin feature-name`
5. Submit a pull request.


## Contact

For questions or inquiries related to the back-end, please contact me `https://www.linkedin.com/in/masoud-rad65/`.
