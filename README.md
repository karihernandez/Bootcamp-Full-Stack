# How to setup the project for testing

## Prerequisites

Node.js installed on your machine.

Docker installed to run MongoDB in a container.

## Steps to run the code

Clone this repository to your local machine.

```bash
git clone https://github.com/your_username/repository-name.git

```

Navigate to the project directory.

```bash
cd repository-name

```

## Setting up the database

To set up the MongoDB database, ensure that you have a functional Docker setup. You should run the following commands from the API directory (`/bank-api`).

```bash
# Create a Docker network to allow the database and the API to connect with each other. Run the following command:

docker network create bootcamp

# Start a MongoDB container with data persistency. The MongoDB data will be stored in the `/bank-api/data/db directory``, and the MongoDB port is exposed for development purposes. Run the following command:

docker run --name bootcamp-mongo --hostname db -d -p 27017:27017 --network bootcamp -v $(pwd)/data:/data/db mongo
```

To set up the initial data using mock data, execute the following commands:

```bash
# Copy the users.json file to the MongoDB container

docker cp ./db_sample/users.json bootcamp-mongo:/users.json

# Import the data into the MongoDB database

docker exec -it bootcamp-mongo mongoimport --db bootcamp --collection users --file /users.json --jsonArray
```

## Setting up the API

To set up the API, you need to run the following commands from the API directory (`/bank-api`) to ensure that Docker has the correct build context.

```bash
# Build a Docker image for the API and tag it as "bootcamp-node." Run the following command:

docker build --tag bootcamp-node .

# Run the Docker container for the API with the specified hostname, port mapping, and network configuration. Execute the following command:

docker run -it --hostname api -p 3000:3000 --network bootcamp bootcamp-node
```

## Running code

Install project dependencies.

```bash
npm install
```

Start the application.

```bash
node app.js
```

## Available Endpoints

```bash
`GET /users/married`
# Retrieves all married users.
`GET /users`
# Retrieves all users.
`PUT /users`
# Creates a new user. You need to send a JSON with user data in the request body.
`DELETE /users/:email`
# Deletes a user by their email address.
```

With these steps completed, you will have set up the MongoDB database and the API in Docker containers, allowing you to test your project.
