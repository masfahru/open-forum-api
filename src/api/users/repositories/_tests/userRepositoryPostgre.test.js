/* eslint-disable max-len */
const { nanoid } = require('nanoid');
const DbService = require('../../../../services/databases/abstracts/dbService');
const { UserPreRegister } = require('../../models');
const UserRepositoryPostgre = require('../userRepositoryPostgre');
const InvariantError = require('../../../../utils/errors/invariantError');

describe('Test User Respository PostgreSQL', () => {
  it('should return Invariant Error when username is exist', async () => {
    const payload = {
      username: 'fahru',
      password: 'StrongPassword123#',
      fullname: 'fahru',
    };

    // we only need to return this result from database
    // for more information about this result, please refer to:
    // https://node-postgres.com/api/result
    const mockResolvedValue = {
      rowCount: 1,
      rows: [
        { username: 'fahru' },
      ],
    };
    const mockDbService = new DbService();
    mockDbService.query = jest.fn().mockResolvedValue(mockResolvedValue);

    const mockUserRepository = new UserRepositoryPostgre(mockDbService, nanoid);
    const userPreRegister = new UserPreRegister(payload);
    await expect(mockUserRepository.isUsernameUnique(userPreRegister)).rejects.toThrowError(InvariantError);
  });

  it('should call query properly', async () => {
    const userPreRegister = {
      username: 'fahru',
      password: 'hashed_password',
      fullname: 'fahru',
    };

    const mockResolvedValue = {
      rowCount: 1,
      rows: [
        {
          id: expect.any(String),
          username: 'fahru',
          fullname: 'fahru',
        },
      ],
    };

    const mockDbService = new DbService();
    mockDbService.query = jest.fn().mockResolvedValue(mockResolvedValue);

    const spy = jest.spyOn(mockDbService, 'query');

    const mockUserRepository = new UserRepositoryPostgre(mockDbService, nanoid);
    await mockUserRepository.addUser(userPreRegister);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({
      text: expect.any(String),
      values: [
        expect.any(String),
        userPreRegister.username,
        userPreRegister.password,
        userPreRegister.fullname,
      ],
    });
  });

  it('should return Expected Value when addUser is success', async () => {
    const payload = {
      username: 'fahru',
      password: 'StrongPassword123#',
      fullname: 'fahru',
    };

    const mockResolvedValue = {
      rowCount: 1,
      rows: [
        {
          id: 'user-123-456',
          username: 'fahru',
          fullname: 'fahru',
        },
      ],
    };

    const mockReturnValue = {
      id: 'user-123-456',
      username: 'fahru',
      fullname: 'fahru',
    };

    const mockDbService = new DbService();
    mockDbService.query = jest.fn().mockResolvedValue(mockResolvedValue);

    const mockUserRepository = new UserRepositoryPostgre(mockDbService, nanoid);
    const userPreRegister = new UserPreRegister(payload);
    await expect(mockUserRepository.addUser(userPreRegister)).resolves.toStrictEqual(mockReturnValue);
  });

  it('should return Invariant Error when failed adding user', async () => {
    const payload = {
      username: 'fahru',
      password: 'StrongPassword123#',
      fullname: 'fahru',
    };

    const mockRejectedValue = {
      rowCount: 0,
      rows: [],
    };

    const mockDbService = new DbService();
    mockDbService.query = jest.fn().mockResolvedValue(mockRejectedValue);

    const mockUserRepository = new UserRepositoryPostgre(mockDbService, nanoid);
    const userPreRegister = new UserPreRegister(payload);
    await expect(mockUserRepository.addUser(userPreRegister)).rejects.toThrowError(InvariantError);
  });
});
