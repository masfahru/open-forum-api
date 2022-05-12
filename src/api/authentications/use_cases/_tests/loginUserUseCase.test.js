const NewAuth = require('../../models/newAuth');
const AuthenticationRepository = require('../../repositories/abstracts/authenticationRepository');
const UserRepository = require('../../repositories/abstracts/userRepository');
const AuthenticationTokenManager = require('../../../../utils/security/abstracts/authenticationTokenManager');
const PasswordHash = require('../../../../utils/security/abstracts/passwordHash');
const LoginUserUseCase = require('../loginUserUseCase');

describe('GetAuthenticationUseCase', () => {
  it('should orchestrating the get authentication action correctly', async () => {
    // Arrange
    const username = 'fahru';
    const password = 'Password123#';
    const accessToken = 'access_token';
    const refreshToken = 'refresh_token';

    const useCasePayload = {
      username,
      password,
    };
    const expectedAuthentication = new NewAuth({
      accessToken,
      refreshToken,
    });

    const mockUserRepository = new UserRepository();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    // Mocking
    mockUserRepository.getPasswordByUsername = jest.fn().mockResolvedValue('hashed_password');
    mockPasswordHash.comparePassword = jest.fn()
      .mockResolvedValue();
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockResolvedValue(expectedAuthentication.accessToken);
    mockAuthenticationTokenManager.createRefreshToken = jest.fn()
      .mockResolvedValue(expectedAuthentication.refreshToken);
    mockUserRepository.getIdByUsername = jest.fn()
      .mockResolvedValue('user-123');
    mockAuthenticationRepository.addToken = jest.fn()
      .mockResolvedValue();

    // create use case instance
    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
    });

    // Action
    const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

    // Assert
    expect(actualAuthentication).toEqual(expectedAuthentication);
    expect(mockUserRepository.getPasswordByUsername)
      .toBeCalledWith({ username });
    expect(mockPasswordHash.comparePassword)
      .toBeCalledWith({ password, hashedPassword: 'hashed_password' });
    expect(mockUserRepository.getIdByUsername)
      .toBeCalledWith({ username });
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ username, id: 'user-123' });
    expect(mockAuthenticationTokenManager.createRefreshToken)
      .toBeCalledWith({ username, id: 'user-123' });
    expect(mockAuthenticationRepository.addToken)
      .toBeCalledWith(expectedAuthentication.refreshToken);
  });
});
