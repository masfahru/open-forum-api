const request = require('supertest');
const app = require('../createServer');

describe('HTTP server', () => {
  it('should response success with server connection', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toEqual(200);
  });

  it('should response 404 when request unregistered route', async () => {
    const response = await request(app).get('/unregistered-route');

    expect(response.statusCode).toEqual(404);
  });
});
