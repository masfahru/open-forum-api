/**
 * Function to route the request to the correct handler.
 * @param {UsersHander} handler
 * @returns {[{
 * method: string,
 * path: string
 * handler: function
 * }]} list of routes
 */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUsersHandler,
  },
];

module.exports = routes;
