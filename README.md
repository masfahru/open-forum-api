# OPEN FORUM API

This project is my submission for Dicoding's Back-end class __Menjadi Back-end Developer Expert__. It's not yet a complete project, but it's a good starting point for learning how to build a RESTful API using __TDD__ and __Clean Architectures__.

## Technologies

* [Node.js](https://nodejs.org/)
* [Hapi.js](https://hapijs.com/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Node-postgres](https://node-postgres.com/)
* [Sentry](https://sentry.io/)
* [JWT](https://jwt.io/) (soon)
* [Redis](https://redis.io/) (soon)

## Installation

Make sure your environment has Node.js, PostgreSQL installed.

1. Clone the repository
2. Install dependencies using `npm install`
3. Create PostgreSQL database for development and another one for test
4. Modify the `.env.example` and `.env.test.local.example` file to your needs
5. Rename the `.env.example` file to `.env` and `.env.test.local.example` to `.env.test.local`
6. Run database migration for test using `npx migrate:test up`, and for development using `npx migrate up`
7. Start test automation using `npm run test`, make sure there is no error
8. Start server using `npm run start:hapi` or `npm run start:express`

## Testing

I have included the test files in the folder `tests`. You can import the test files and run the tests using Postman. Currently it passed the test for endpoint `/users`