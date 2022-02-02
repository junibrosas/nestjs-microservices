# nestjs-microservices

Create a proof-of-concept for a communication between services using NestJS framework.

## Installation

Run `npm install` to all services.
Run `npm run start:dev` to all services.

## Running the application

To have a sample running microservice communication:

- Create a POST request in `http://localhost:7000`
- Next, create a POST data.

```
{
    "email": "johndoe@gmail.com",
    "password": "hello-there."
}
```

- Then, you should be able to see a log in `sample-communication` server.

References:
https://dzone.com/articles/how-to-create-a-nestjs-redis-microservice
