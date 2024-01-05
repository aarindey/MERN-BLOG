# Setting up the project, Locally

# Using Docker

1) Use the Docker file attached to the project directory.
2) Open a terminal and navigate to the directory containing the Dockerfile. Run the following command to build the Docker image:
    `docker build -t docker-image .`
3) Once the image is build run the docker container. 
    `docker run -p 3000:3000 docker-image`
    The -p flag maps port 3000 from the container to port 3000 on your localhost. Adjust the port mappings if your application uses a different port.
4) You should pass the environment variables to your Docker container using the -e flag with the docker run command.

# Without using Docker

1) Run `npm install` inside backend and client directory, respectively.
2) Update the .env file of backend directory with `MONGO_URL` and `PORT` respectively.
3) Start the backend server using `npm start` or `npx nodemon index.js` command.
4) Update `API_URL` inside `config.json` in the `client/src` directory to point to the local development server where your backend is running. 
5) Run `npm start` to start the react development server.
