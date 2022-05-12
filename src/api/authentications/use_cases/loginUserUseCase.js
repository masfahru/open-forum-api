const { UserLogin, NewAuth } = require('../models');

/**
 * Login Use case for authenticating a user
 */
module.exports = class LoginUserUseCase {
  /**
   * @property
   * @private
   */
  #userRepository;

  #authenticationRepository;

  #passwordHash;

  #authenticationTokenManager;

  /**
   * @constructor
   * @param {{
   * userRepository: UserRepository,
   * authenticationRepository: AuthenticationRepository,
   * passwordHash: PasswordHash,
   * authenticationTokenManager: AuthenticationTokenManager
   * }} dependencies
   */
  constructor({
    userRepository,
    authenticationRepository,
    passwordHash,
    authenticationTokenManager }) {
    this.#userRepository = userRepository;
    this.#authenticationRepository = authenticationRepository;
    this.#passwordHash = passwordHash;
    this.#authenticationTokenManager = authenticationTokenManager;
  }

  /**
   * @method execute
   * @public
   * @param {{ username: string, password: string }} payload
   * @returns {Promise<{accessToken: string, refreshToken: string}>}
   */
  async execute(payload) {
    const { username, password } = new UserLogin(payload);
    const hashedPassword = await this.#userRepository.getPasswordByUsername({ username });
    await this.#passwordHash.comparePassword({ password, hashedPassword });
    const id = await this.#userRepository.getIdByUsername({ username });
    const accessToken = await this.#authenticationTokenManager
      .createAccessToken({ username, id });
    const refreshToken = await this.#authenticationTokenManager
      .createRefreshToken({ username, id });
    const newAuthentication = new NewAuth({
      accessToken,
      refreshToken,
    });
    await this.#authenticationRepository.addToken(newAuthentication.refreshToken);

    return newAuthentication;
  }
};
