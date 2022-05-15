const request = require('supertest');
const createServer = require('../createServer');

describe('HTTP server', () => {
  it('should response success with server connection', async () => {
    const server = await createServer();

    const response = await request(server.listener).get('/');

    expect(response.statusCode).toEqual(200);
  });

  it('should response 404 when request unregistered route', async () => {
    const server = await createServer();

    const response = await request(server.listener).get('/unregistered-route');

    expect(response.statusCode).toEqual(404);
  });
});
