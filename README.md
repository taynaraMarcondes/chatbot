# Serverless Twilio Project Integration Guide

## Overview
This repository contains a serverless project integrated with Twilio Studio. It allows you to build and deploy serverless applications that leverage Twilio's communication capabilities. To get started, follow the instructions below.

## Prerequisites
Before you can run this project, make sure you have the following prerequisites installed:

1. Docker: Install Docker from the official website: [https://www.docker.com/](https://www.docker.com/)

2. Docker Compose: Install Docker Compose following the instructions for your operating system: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

3. Node.js: Install Node.js from the official website: [https://nodejs.org/](https://nodejs.org/)

## Installation Steps
Follow the steps below to set up and run the serverless project:

1. Clone the repository: 
```shell
git clone https://github.com/taynaraMarcondes/chatbot.git
```

2. Change into the project directory:
```shell
cd chatbot
```

3. Install dependencies:
```shell
npm install
```

4. Copy the `.env.example` file and rename it to `.env`. Edit the `.env` file and fill in the required variables with the appropriate values.

5. Open the `/assets/ngrok/ngrok.yml` file and replace the `authtoken` placeholder with your actual Ngrok Auth Token.

6. Run the containers:
```shell
docker-compose up
```

7. Access the ngrok dashboard by visiting [http://localhost:4040](http://localhost:4040) in your web browser. Note the exposed port for the database.

8. Open the `/assets/db/connection.private.js` file and locate the line 7 where the database configuration is set. Substitute the database port with the one obtained from the ngrok dashboard.

9. Deploy the serverless project by running the following command:
```shell
twilio serverless:deploy
```

## Usage
Once the installation and deployment steps are completed, you can start using the serverless project integrated with Twilio Studio. Follow the instructions provided in the project documentation or guide to interact with the deployed serverless application.

## Conclusion
Congratulations! You have successfully set up and deployed the serverless project integrated with Twilio Studio. You can now leverage Twilio's communication capabilities within your serverless applications. 