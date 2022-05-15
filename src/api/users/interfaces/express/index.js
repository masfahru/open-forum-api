const express = require('express');
const UsersHandler = require('./handler');
const routes = require('./routes');

const router = express.Router();

const usersMiddleware = (container) => {
  const usersHandler = new UsersHandler(container);
  // we need to parse the request body to JSON
  // so the handler can access the data via req.body
  router.use(express.json());
  routes(usersHandler).forEach((route) => {
    router[route.method.toLowerCase()](route.path, route.handler);
  });
  return router;
};
module.exports = usersMiddleware;
