const DbService = require('../../../../services/databases/abstracts/dbService');
const AuthenticationError = require('../../../../utils/errors/authenticationError');
const AuthUserRepositoryPostgre = require('../authUserRepositoryPostgre');

describe('Test UserRepository Postgre for Authentications', () => {
  it('should throw 401 Error when username not found', async () => {
    const payload = {
      username: 'fahru',
      password: 'StrongP4ssw0rd$',
    };

    const mockResolvedValue = {
      rowCount: 0,
      rows: [],
    };
    const mockDbService = new DbService();
    mockDbService.query = jest.fn().mockResolvedValue(mockResolvedValue);

    const mockRepository = new AuthUserRepositoryPostgre(mockDbService);
    // eslint-disable-next-line max-len
    await expect(mockRepository.getPasswordByUsername(payload)).rejects.toThrowError(AuthenticationError);
  });

  it('should return required value if username is found', async () => {
    const payload = {
      username: 'fahru',
      password: 'StrongP4ssw0rd$',
    };

    const mockResolvedValue = {
      rowCount: 1,
      rows: [
        {
          password: 'Hashed_Password',
        },
      ],
    };
    const mockDbService = new DbService();
    mockDbService.query = jest.fn().mockResolvedValue(mockResolvedValue);

    const mockRepository = new AuthUserRepositoryPostgre(mockDbService);
    const result = await mockRepository.getPasswordByUsername(payload);
    expect(result).toEqual({
      password: 'Hashed_Password',
    });
    expect(mockDbService.query).toHaveBeenCalledTimes(1);
    expect(mockDbService.query).toHaveBeenCalledWith({
      text: expect.any(String),
      values: expect.any(Array),
    });
  });
});
