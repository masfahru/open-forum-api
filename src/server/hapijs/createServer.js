const Hapi = require('@hapi/hapi');
const { Pool } = require('pg');
const { serverConfig } = require('../../configs/server');
const users = require('../../api/users/interfaces/hapi');
const ClientError = require('../../utils/errors/clientError');
const DatabaseError = require('../../utils/errors/databaseError');
const DomainErrorTranslator = require('../../utils/errors/domainErrorTranslator');

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

      // report to sentry if sentry is set
      if (container.get('sentry')) {
        container.get('sentry').captureException(response);
      }

      let status = 'Server Error';
      if (response instanceof DatabaseError) {
        status = 'Database Error';
      }

      const newResponse = h.response({
        status,
        message: 'Our Engineer is working on it. Please try again later.',
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return response.continue || response;
  });

  server.events.on('closing', () => {
    container.get(Pool.name).end();
  });

  return server;
};

module.exports = createServer;
