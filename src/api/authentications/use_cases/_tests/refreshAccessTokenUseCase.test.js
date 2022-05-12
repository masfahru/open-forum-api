const AuthenticationRepository = require('../../repositories/abstracts/authenticationRepository');
const AuthenticationTokenManager = require('../../../../utils/security/abstracts/authenticationTokenManager');
const RefreshAccessTokenUseCase = require('../refreshAccessTokenUseCase');

describe('RefreshAccessTokenUseCase', () => {
  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const useCasePayload = {};
    const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase({});

    // Action & Assert
    await expect(refreshAccessTokenUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
  });

  it('should throw error if refresh token not string', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 1,
    };
    const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase({});

    // Action & Assert
    await expect(refreshAccessTokenUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the refresh authentication action correctly', async () => {
    // Arrange
    const refreshToken = 'some_refresh_token';
    const useCasePayload = {
      refreshToken,
    };
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    // Mocking
    mockAuthenticationRepository.checkAvailabilityToken = jest.fn()
      .mockResolvedValue();
    mockAuthenticationTokenManager.verifyRefreshToken = jest.fn()
      .mockResolvedValue();
    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockResolvedValue({ username: 'fahru', id: 'user-123' });
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockResolvedValue('some_new_access_token');
    // Create the use case instace
    const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase({
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    const accessToken = await refreshAccessTokenUseCase.execute(useCasePayload);

    // Assert
    expect(mockAuthenticationTokenManager.verifyRefreshToken)
      .toBeCalledWith({ refreshToken });
    expect(mockAuthenticationRepository.checkAvailabilityToken)
      .toBeCalledWith({ refreshToken });
    expect(mockAuthenticationTokenManager.decodePayload)
      .toBeCalledWith({ refreshToken });
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ username: 'fahru', id: 'user-123' });
    expect(accessToken).toEqual('some_new_access_token');
  });
});
