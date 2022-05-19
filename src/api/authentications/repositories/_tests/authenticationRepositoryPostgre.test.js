const { Pool } = require('pg');
const { testDbConfig } = require('../../../../configs/database');
const DbService = require('../../../../services/databases/postgres/dbServicePostgre');
const InvariantError = require('../../../../utils/errors/invariantError');
const AuthenticationRepository = require('../authenticationRepositoryPostgre');

describe('Test UserRepository Postgre for Authentications', () => {
  const pool = new Pool(testDbConfig);

  // truncating table happens before and after all test
  // so make sure to use unique tokens according to test
  beforeAll(async () => {
    // should truncate the table first
    await pool.query('TRUNCATE tokens CASCADE');
    // insert a token
    const query = {
      text: 'INSERT INTO tokens (token) VALUES ($1)',
      values: ['jwt_tokens'],
    };
    await pool.query(query.text, query.values);
  });

  afterAll(async () => {
    // Truncate token table
    await pool.query('TRUNCATE tokens CASCADE');

    // drain pool
    await pool.end();
  });

  it('should throw 500 Server Error if token to add is not found', async () => {
    const payload = {
      username: 'fahru',
      password: 'StrongP4ssw0rd$',
    };

    const dbService = new DbService(pool);
    const authRepository = new AuthenticationRepository(dbService);
    // eslint-disable-next-line max-len
    await expect(authRepository.addToken(payload)).rejects.toThrowError(Error);
    await expect(authRepository.isTokenExist(payload)).rejects.toThrowError(Error);
    await expect(authRepository.deleteToken(payload)).rejects.toThrowError(Error);
  });

  it('should throw 500 Server Error if token is not string', async () => {
    const payload = {
      token: true,
    };

    const dbService = new DbService(pool);
    const authRepository = new AuthenticationRepository(dbService);
    // eslint-disable-next-line max-len
    await expect(authRepository.addToken(payload)).rejects.toThrowError(Error);
    await expect(authRepository.isTokenExist(payload)).rejects.toThrowError(Error);
    await expect(authRepository.deleteToken(payload)).rejects.toThrowError(Error);
  });

  it('should call dbService query when adding valid token', async () => {
    const payload = {
      token: 'jwt_new_tokens',
    };

    const dbService = new DbService(pool);
    const spy = jest.spyOn(dbService, 'query');
    const authUserRepository = new AuthenticationRepository(dbService);
    const result = await authUserRepository.addToken(payload);
    expect(spy).toHaveBeenCalledTimes(1);
    // if success, result should be true
    expect(result).toEqual(true);
  });

  it('should return invariant error if token is not exist when checking token', async () => {
    const payload = {
      token: 'jwt_tokens_random',
    };

    const dbService = new DbService(pool);
    const spy = jest.spyOn(dbService, 'query');
    const authUserRepository = new AuthenticationRepository(dbService);
    await expect(authUserRepository.isTokenExist(payload)).rejects.toThrowError(InvariantError);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return true when tokens is exist', async () => {
    const payload = {
      token: 'jwt_tokens',
    };

    const dbService = new DbService(pool);
    const spy = jest.spyOn(dbService, 'query');
    const authUserRepository = new AuthenticationRepository(dbService);
    const result = await authUserRepository.isTokenExist(payload);
    expect(spy).toHaveBeenCalledTimes(1);
    // if success, result should be true
    expect(result).toEqual(true);
  });

  it('should return true when tokens is successfully deleted', async () => {
    const payload = {
      token: 'jwt_tokens',
    };

    const dbService = new DbService(pool);
    const spy = jest.spyOn(dbService, 'query');
    const authUserRepository = new AuthenticationRepository(dbService);
    const result = await authUserRepository.deleteToken(payload);
    expect(spy).toHaveBeenCalledTimes(1);
    // if success, result should be true
    expect(result).toEqual(true);
  });
});
