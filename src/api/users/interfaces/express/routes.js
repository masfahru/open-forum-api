/**
 * Function to route the request to the correct handler.
 * @param {UsersHander} handler
 * @returns {Route[]} list of routes
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUsersHandler,
  },
];

module.exports = routes;
