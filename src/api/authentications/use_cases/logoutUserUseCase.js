/* eslint-disable class-methods-use-this */
module.exports = class LogoutUserUseCase {
  /**
   * @property
   * @private
   */
  #authenticationRepository;

  /**
   * @constructor
   * @param {{ authenticationRepository: AuthenticationRepository}} dependencies
   */
  constructor({ authenticationRepository }) {
    this.#authenticationRepository = authenticationRepository;
  }

  /**
   * @method execute
   * @param {{token:string}} payload
   */
  async execute(payload) {
    const { refreshToken } = payload;
    this.#verifyPayload(refreshToken);
    await this.#authenticationRepository.checkAvailabilityToken({ refreshToken });
    await this.#authenticationRepository.deleteToken({ refreshToken });
  }

  /**
   * @method verifyPayload
   */
  #verifyPayload(refreshToken) {
    if (!refreshToken) throw new Error('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    if (typeof refreshToken !== 'string') throw new Error('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  }
};
