# nestjs-microservices

Create a proof-of-concept for a communication between services using NestJS framework.

## Brief architecture overview

This API showcase consists of the following parts:

- Client - A NestJS HTTP gateway to publishes events to microservices.
- Client Express - A very simple Express server that publishes event.
- Task service - responsible for heavy processing.
- Mailer service - responsible for sending out email messages.

## Relationships

- The `client` server publishes publishes `mailer-send-exported-users` and `task-process-export-users` that is beng handled in `mailer` and `task` service.
- The `client-express` is a simple server that demonstrates a way to publish and event and the `task` service which is a
- The `task` service is a hybrid NestJS application that listens for HTTP requests and make use of connected microservices. It publishes `mailer-send-processed-data` event and the `mailer` service handles the event.
- The `mailer` service is a microservice that listens to events.


## Redis

You will need redis installed on your server to support the queue and the transport.

## Installation

We 4 have services overall.

Client

```
cd client && npm install && npm run start:dev
```

Client ExpressJS

```
cd client-express && npm install && npm run dev
```

Task

```
cd task && npm install && npm run start:dev
```

Mailer

```
cd mailer && npm install && npm run start:dev
```


## References
- https://docs.nestjs.com/microservices/basics
- https://cloudnweb.dev/2019/08/implementing-redis-pub-sub-in-node-js-application
