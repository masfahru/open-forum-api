/**
 * RefreshAccessToken use case
 * generates a new access token
 */
module.exports = class RefreshAccessTokenUseCase {
  #authenticationRepository;

  #authenticationTokenManager;

  /**
   * @constructor
   * @param {{
   * authenticationRepository: AuthenticationRepository,
   * authenticationTokenManager: AuthenticationTokenManager
   * }} dependencies
   */
  constructor({
    authenticationRepository,
    authenticationTokenManager,
  }) {
    this.#authenticationRepository = authenticationRepository;
    this.#authenticationTokenManager = authenticationTokenManager;
  }

  /**
 * @method execute
 * @param {{refreshToken:string}} payload
 * @returns {Promise<{accessToken:string}>}
 */
  async execute(payload) {
    const { refreshToken } = payload;
    if (!refreshToken) throw Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    if (typeof refreshToken !== 'string') throw Error('REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    await this.#authenticationTokenManager.verifyRefreshToken({ refreshToken });
    await this.#authenticationRepository.checkAvailabilityToken({ refreshToken });
    const { id, username } = await this.#authenticationTokenManager.decodePayload({ refreshToken });
    const accessToken = await this.#authenticationTokenManager.createAccessToken({ id, username });
    return accessToken;
  }
};
