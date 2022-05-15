const { Pool } = require('pg');
const request = require('supertest');
const { container } = require('../../../container');
const createServer = require('../createServer');

describe('/users endpoint', () => {
  afterEach(async () => {
    await container.get(Pool.name).query('TRUNCATE users CASCADE');
  });

  afterAll(async () => {
    await container.get(Pool.name).end();
  });

  describe('when POST /users', () => {
    it('should response 201 and persisted user', async () => {
      const requestPayload = {
        username: 'dicoding',
        password: 'Password123#',
        fullname: 'Dicoding Indonesia',
      };
      // eslint-disable-next-line no-undef
      const server = createServer(container);

      const response = await request(server).post('/users').send(requestPayload);

      expect(response.statusCode).toEqual(201);
    });

    it('should response 400 when request payload not contain needed property', async () => {
      const requestPayload = {
        fullname: 'Dicoding Indonesia',
        password: 'Password123#',
      };
      const server = createServer(container);

      const response = await request(server).post('/users').send(requestPayload);

      expect(response.statusCode).toEqual(400);
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      const requestPayload = {
        username: 'fahru',
        password: 'Password123#',
        fullname: ['Dicoding Indonesia'],
      };
      const server = createServer(container);

      const response = await request(server).post('/users').send(requestPayload);

      expect(response.statusCode).toEqual(400);
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('tidak dapat membuat user baru karena tipe data tidak sesuai');
    });

    it('should response 400 when username more than 50 character', async () => {
      const requestPayload = {
        username: 'farhrudicodingindonesiadicodingindonesiadicodingindonesiadicoding',
        password: 'Password123#',
        fullname: 'Dicoding Indonesia',
      };
      const server = createServer(container);

      const response = await request(server).post('/users').send(requestPayload);

      expect(response.statusCode).toEqual(400);
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('tidak dapat membuat user baru karena karakter username melebihi batas limit');
    });

    it('should response 400 when password is not strong enough', async () => {
      const requestPayload = {
        username: 'fahru',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };
      const server = createServer(container);

      const response = await request(server).post('/users').send(requestPayload);

      expect(response.statusCode).toEqual(400);
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('tidak dapat membuat user baru karena password tidak memenuhi kriteria keamanan');
    });

    it('should response 400 when username contain restricted character', async () => {
      const requestPayload = {
        username: 'dicoding indonesia',
        password: 'Password123#',
        fullname: 'Dicoding Indonesia',
      };
      const server = createServer(container);

      const response = await request(server).post('/users').send(requestPayload);

      expect(response.statusCode).toEqual(400);
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('tidak dapat membuat user baru karena username mengandung karakter terlarang');
    });

    it('should response 400 when username unavailable', async () => {
      const queryTest = {
        text: 'INSERT INTO users (id, username, password, fullname) VALUES ($1, $2, $3, $4)',
        values: ['user-123-456', 'dicoding', 'hashed_password', 'Dicoding Indonesia'],
      };
      container.get(Pool.name).query(queryTest.text, queryTest.values);
      const requestPayload = {
        username: 'dicoding',
        fullname: 'Dicoding Indonesia',
        password: 'Password123#',
      };
      const server = createServer(container);

      const response = await request(server).post('/users').send(requestPayload);

      expect(response.statusCode).toEqual(400);
      expect(response.body.status).toEqual('fail');
      expect(response.body.message).toEqual('username tidak tersedia');
    });
  });
});
