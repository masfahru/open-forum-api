const AuthenticationsHander = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'authentications',
  register: async (server, { container }) => {
    const usersHandler = new AuthenticationsHander(container);
    server.route(routes(usersHandler));
  },
};
