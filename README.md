# nodeJS API REST for a daily music submission app

This is a RESTful API built with Node.js for a daily music submission app. It includes features such as voting for music, creating session, or submiting music.

## Prerequisites

Before you begin, ensure you have Docker installed on your machine.

## Setup

1. Clone the repository to your local machine.
```
git clone https://github.com/Antoinelc7/DailyMusic.git
```
2. Create a `.env` file in the root directory of your project. Use the `.env.sample` file as a guide for the environment variables you need to set.

## Launch

To start the application, run the following command:

```bash
docker compose up
```

## First Launch Without package.json
If you are launching the application for the first time without a package.json file, run the following command:

```bash
docker run -it -v $PWD:/app node /bin/bash
```

## Run a Bash into Node Container
To run a bash command inside the Node container, use the following command:

## Running Tests
To run tests, first start the Docker container. Then, execute the following command inside the Docker container:

```bash
npm test
```

## API Documentation
You can access the Swagger documentation for the API at the /docs endpoint. For example, if you are running the application locally, you can access the documentation at http://localhost:3000/docs.