# TODO Application

A simple TODO Application with a frontend built using React, TypeScript, and Tailwind, and a backend powered by Node.js, TypeScript, Express, and MongoDB.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

Describe your TODO Application and its key features briefly.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository(Backend):

   ```bash
   git clone https://github.com/kereo32/TodoAppBackend.git

2. Clone the repository(Frontend)

   ```bash
   git clone https://github.com/kereo32/TodoAppFrontend.git

3. Install dependencies for both projects 

    ```bash
        cd frontend
        npm install # or yarn install
        cd backend
        npm install
4. Run dev environment by
   
   ```bash
   npm run dev


## Authentication
The application uses JSON Web Tokens (JWT) for authentication. To authenticate, make a request to the authentication route and obtain a token.

## API Endpoints

- POST /auth/register To register new user with {username,password}
- POST /auth/login To login to existing user with {username,password}

- POST /todo/batch: Get TODO Items by User's todoId array.
- POST /todo Create a new TODO item.
- POST /todo/upload Uploads File to S3 Server
- POST /todo/addtodoidtouser Adds todoId to User's todoId array.
- POST /todo/removetodoidfromuser Removes todoId from User's todoId array.
- PUT /todo/:_id Update a TODO item.
- DELETE /todo/:_id Delete a TODO item.


## Environment Variables

Make sure to set up the following environment variables before running the application:

 - MONGO_URI: MongoDB connection URI.
 - SECRET_KEY: Secret key for JWT authentication.
 - AWS_ACCESS_KEY_ID: AWS Access Key ID for S3 file uploads.
 - AWS_SECRET_ACCESS_KEY: AWS Secret Access Key for S3 file uploads.
 - Additionally, for file uploads to S3, ensure that the backend is configured to interact with your S3 bucket. Update the necessary configurations in the backend code accordingly.


## Contributing

 - Fork the repository.
 - Create a new branch for your feature or bug fix.
 - Make changes and submit a pull request.

## License
 This project is licensed under the MIT License.

## Acknowledgements
 - React
 - Node.js
 - Express
 - MongoDB
 - Tailwind CSS
 - TypeScript
