const Hapi = require('@hapi/hapi');
const { ServerConfig } = require('../../../configs');

const createServer = async () => {
  const server = Hapi.server({
    host: ServerConfig.HOST,
    port: ServerConfig.PORT,
  });

  // we won't use index route but just for testing
  server.route({
    method: 'GET',
    path: '/',
    handler: (_, h) => h.response('OPEN-FORUM-API Hapijs is Online'),
  });

  return server;
};

module.exports = createServer;
