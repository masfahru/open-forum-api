const Hapi = require('@hapi/hapi');
const { serverConfig } = require('../../configs/server');
const users = require('../../api/users/interfaces/hapi');
const ClientError = require('../../utils/errors/clientError');
const DatabaseError = require('../../utils/errors/databaseError');
const DomainErrorTranslator = require('../../utils/errors/domainErrorTranslator');
const loggerSentry = require('../../utils/logger/sentry');

const createServer = async (container) => {
  const server = Hapi.server({
    host: serverConfig.host,
    port: serverConfig.port,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: users,
      options: {
        container,
      },
    },
  ]);

  // we won't use index route but just for testing
  server.route({
    method: 'GET',
    path: '/',
    handler: (_, h) => h.response('OPEN-FORUM-API Hapijs is Online'),
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      const translatedError = DomainErrorTranslator.translate(response);
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      if (!translatedError.isServer) {
        return h.continue;
      }

      loggerSentry(response);

      if (translatedError instanceof DatabaseError) {
        const newResponse = h.response({
          status: 'Database Error',
          message: 'Our Engineer is working on it. Please try again later.',
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      const newResponse = h.response({
        status: 'Server Error',
        message: 'Our Engineer is working on it. Please try again later.',
      });
      newResponse.code(500);
      return newResponse;
    }

    return response.continue || response;
  });

  return server;
};

module.exports = createServer;
