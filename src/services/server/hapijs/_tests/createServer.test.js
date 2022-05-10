const createServer = require('../createServer');

describe('HTTP server', () => {
  it('should response success with server connection', async () => {
    const options = {
      method: 'GET',
      url: '/',
    };

    const server = await createServer({});

    const response = await server.inject(options);

    expect(response.statusCode).toEqual(200);
  });

  it('should response 404 when request unregistered route', async () => {
    const options = {
      method: 'GET',
      url: '/unregisteredRoutr',
    };

    const server = await createServer({});

    const response = await server.inject(options);

    expect(response.statusCode).toEqual(404);
  });
});
