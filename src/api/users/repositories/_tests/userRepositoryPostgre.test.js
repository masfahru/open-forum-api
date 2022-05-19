/* eslint-disable max-len */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const DbServicePostgre = require('../../../../services/databases/postgres/dbServicePostgre');
const { testDbConfig } = require('../../../../configs/database');
const UserRepositoryPostgre = require('../userRepositoryPostgre');
const InvariantError = require('../../../../utils/errors/invariantError');

describe('Integration Test User Respository PostgreSQL', () => {
  const pool = new Pool(testDbConfig);
  const dbService = new DbServicePostgre(pool);

  // truncating table happens before and after all test
  // so make sure to use unique username each test
  beforeAll(async () => {
    // should truncate the table first
    await dbService.query({
      text: 'TRUNCATE users CASCADE',
      values: [],
    });
    // insert a user
    const query = {
      text: 'INSERT INTO users (id, username, password, fullname) VALUES ($1, $2, $3, $4)',
      values: ['id-123-456-789-10', 'user-existUsername', 'hashed_password', 'fullname'],
    };
    await dbService.query(query);
  });

  afterAll(async () => {
    // Truncate user table
    await dbService.query({
      text: 'TRUNCATE users CASCADE',
      values: [],
    });

    // end pool
    await pool.end();
  });

  it('should return Invariant Error when username is exist', async () => {
    const payload = {
      username: 'user-existUsername',
      password: 'hashed_password#',
      fullname: 'fahru',
    };

    const userRepository = new UserRepositoryPostgre(dbService, nanoid);

    await expect(userRepository.isUsernameUnique(payload)).rejects.toThrowError(InvariantError);
  });

  it('should return Expected Value when addUser is success', async () => {
    const payload = {
      username: 'user-fahru',
      password: 'hashed_password#',
      fullname: 'fahru',
    };

    const spy = jest.spyOn(dbService, 'query');
    const userRepository = new UserRepositoryPostgre(dbService, nanoid);

    await expect(userRepository.addUser(payload)).resolves.toStrictEqual({
      id: expect.any(String),
      username: payload.username,
      fullname: payload.fullname,
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
