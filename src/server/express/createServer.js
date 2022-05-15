const express = require('express');
const users = require('../../api/users/interfaces/express');
const clientErrorHandler = require('./errors/clientErrorHandler');
const databaseErrorHandler = require('./errors/databaseErrorHandler');
const serverErrorHandler = require('./errors/serverErrorHandler');

const createServer = (container) => {
  const app = express();

  app.use(users(container));
  app.get('/', (_, res) => {
    res.status(200).send('OPEN-FORUM-API ExpressJs is Online');
  });
  app.use(clientErrorHandler);
  app.use(databaseErrorHandler);
  app.use(serverErrorHandler);
  return app;
};

module.exports = createServer;
