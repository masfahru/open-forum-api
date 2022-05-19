const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { testDbConfig } = require('../../../../configs/database');
const DbService = require('../../../../services/databases/postgres/dbServicePostgre');
const AuthenticationError = require('../../../../utils/errors/authenticationError');
const AuthUserRepository = require('../authUserRepositoryPostgre');

describe('Test UserRepository Postgre for Authentications', () => {
  const pool = new Pool(testDbConfig);
  const dbService = new DbService(pool);
  const authUserRepository = new AuthUserRepository(dbService, nanoid);

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
  });

  it('should throw 401 Error when username not found', async () => {
    const payload = {
      username: 'fahru',
      password: 'StrongP4ssw0rd$',
    };

    // eslint-disable-next-line max-len
    await expect(authUserRepository.getPasswordByUsername(payload)).rejects.toThrowError(AuthenticationError);
  });

  it('should return required value if username is found', async () => {
    const payload = {
      username: 'user-existUsername',
    };

    const result = await authUserRepository.getPasswordByUsername(payload);
    expect(result).toEqual({
      password: expect.any(String),
    });
  });
});
