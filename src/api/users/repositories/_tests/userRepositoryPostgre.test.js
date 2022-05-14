/* eslint-disable max-len */
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

    const mockDbService = new DbService();
    mockDbService.query = jest.fn().mockResolvedValue([{ username: 'fahru' }]);

    const mockUserRepository = new UserRepositoryPostgre(mockDbService);
    const userPreRegister = new UserPreRegister(payload);
    await expect(mockUserRepository.isUsernameUnique(userPreRegister)).rejects.toThrowError(InvariantError);
  });

  it('should return Expected Value when addUser is success', async () => {
    const payload = {
      username: 'fahru',
      password: 'StrongPassword123#',
      fullname: 'fahru',
    };

    const expectedPayload = {
      id: 'user-123-456',
      username: 'fahru',
      fullname: 'fahru',
    };

    const mockDbService = new DbService();
    mockDbService.query = jest.fn().mockResolvedValue([expectedPayload]);

    const mockUserRepository = new UserRepositoryPostgre(mockDbService);
    const userPreRegister = new UserPreRegister(payload);
    await expect(mockUserRepository.addUser(userPreRegister)).resolves.toBe(expectedPayload);
  });

  it('should return Invariant Error when failed adding user', async () => {
    const payload = {
      username: 'fahru',
      password: 'StrongPassword123#',
      fullname: 'fahru',
    };

    const mockDbService = new DbService();
    mockDbService.query = jest.fn().mockResolvedValue([]);

    const mockUserRepository = new UserRepositoryPostgre(mockDbService);
    const userPreRegister = new UserPreRegister(payload);
    await expect(mockUserRepository.addUser(userPreRegister)).rejects.toThrowError(InvariantError);
  });

  // it('should return Invariant Error when the database connection is failed', async () => {
  //   const payload = {
  //     username: 'fahru',
  //     password: 'StrongPassword123#',
  //     fullname: 'fahru',
  //   };

  //   const mockDbService = new DbService();
  //   mockDbService.query = jest.fn().mockRejectedValue(new DatabaseError('Database connection failed'));

  //   const mockUserRepository = new UserRepositoryPostgre(mockDbService);
  //   const userPreRegister = new UserPreRegister(payload);
  //   await expect(mockUserRepository.addUser(userPreRegister)).rejects.toThrowError(DatabaseError);
  // });
});
