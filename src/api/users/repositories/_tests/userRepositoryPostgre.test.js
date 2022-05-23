/* eslint-disable max-len */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const DbServicePostgre = require('../../../../services/databases/postgres/dbServicePostgre');
const { testDbConfig } = require('../../../../configs/database');
const UserRepositoryPostgre = require('../userRepositoryPostgre');
const InvariantError = require('../../../../utils/errors/invariantError');

describe('Integration Test User Respository PostgreSQL', () => {
  const pool = new Pool(testDbConfig);

  // truncating table happens before and after all test
  // so make sure to use unique username each test
  beforeAll(async () => {
    // should truncate the table first
    await pool.query('TRUNCATE users CASCADE');
    // insert a user
    const query = {
      text: 'INSERT INTO users (id, username, password, fullname) VALUES ($1, $2, $3, $4)',
      values: ['id-123-456-789-10', 'user-existUsername', 'hashed_password', 'fullname'],
    };
    await pool.query(query.text, query.values);
  });

  afterAll(async () => {
    // Truncate user table
    await pool.query('TRUNCATE users CASCADE');

    // end pool
    await pool.end();
  });

  it('should return Invariant Error when username is exist', async () => {
    const payload = {
      username: 'user-existUsername',
      password: 'hashed_password#',
      fullname: 'fahru',
    };

    const dbService = new DbServicePostgre(pool);
    const spy = jest.spyOn(dbService, 'query');
    const userRepository = new UserRepositoryPostgre(dbService, nanoid);

    await expect(userRepository.isUsernameUnique(payload)).rejects.toThrowError(InvariantError);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return Expected Value when addUser is success', async () => {
    const payload = {
      username: 'user-fahru',
      password: 'hashed_password#',
      fullname: 'fahru',
    };

    const dbService = new DbServicePostgre(pool);
    const spy = jest.spyOn(dbService, 'query');
    const userRepository = new UserRepositoryPostgre(dbService, nanoid);

    await expect(userRepository.addUser(payload)).resolves.toStrictEqual({
      id: expect.any(String),
      username: payload.username,
      fullname: payload.fullname,
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should throw 400 Error when username not found', async () => {
    const payload = {
      username: 'notfound-username',
      password: 'StrongP4ssw0rd$',
    };

    const dbService = new DbServicePostgre(pool);
    const spy = jest.spyOn(dbService, 'query');
    const userRepository = new UserRepositoryPostgre(dbService, nanoid);
    // eslint-disable-next-line max-len
    await expect(userRepository.getPasswordByUsername(payload)).rejects.toThrowError(InvariantError);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return required value if username is found', async () => {
    const payload = {
      username: 'user-existUsername',
    };
    const dbService = new DbServicePostgre(pool);
    const spy = jest.spyOn(dbService, 'query');
    const userRepositoryPostgre = new UserRepositoryPostgre(dbService, nanoid);

    const result = await userRepositoryPostgre.getPasswordByUsername(payload);
    expect(result).toEqual({
      password: expect.any(String),
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
