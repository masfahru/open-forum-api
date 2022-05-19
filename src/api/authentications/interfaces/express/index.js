const express = require('express');
const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

const router = express.Router();

const authenticationsMiddleware = (container) => {
  const authenticationsHandler = new AuthenticationsHandler(container);
  // we need to parse the request body to JSON
  // so the handler can access the data via req.body
  router.use(express.json());
  routes(authenticationsHandler).forEach((route) => {
    router[route.method.toLowerCase()](route.path, route.handler);
  });
  return router;
};
module.exports = authenticationsMiddleware;
