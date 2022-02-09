# nestjs-microservices

Create a proof-of-concept for a communication between services using NestJS framework.

## Installation

Run `npm install` to all services.
Run `npm run start:dev` to all services.

You will need redis installed on your server to support the queue. The configuration of this database is simple.

References:
https://dzone.com/articles/how-to-create-a-nestjs-redis-microservice

## Tools

- NestJS
- Mail
- BullJS

## Brief architecture overview

This API showcase consists of the following parts:

- API gateway
- Task service - responsible for heavy processing.
- Mailer service - responsible for sending out email messages.

This example uses a SINGLE database (MongoDB) instance for all microservices. This is not a correct point, the correct way is to use a separate DB instance for every microservice. I used one DB instance for all microservices to simplify this example.
