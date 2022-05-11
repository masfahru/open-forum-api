const { UserPreRegister, UserRegistered } = require('../models');

/**
 * Add User Use Case
 */
module.exports = class AddUserUseCase {
  /**
   * @property
   * @type {UserRepository}
   * @private
   */
  #userRepository;

  /**
   * @property
   * @type {PasswordHash}
   * @private
   */
  #passwordHash;

  /**
   * @constructor
   * @param {{userRepository: UserRepository, passwordHash: PasswordHash}} dependencies
   */
  constructor({ userRepository, passwordHash }) {
    this.#userRepository = userRepository;
    this.#passwordHash = passwordHash;
  }

  /**
   * @method execute
   * @public
   * @async
   * @param {{username: string, password: string, fullname: string}} payload
   * @returns {Promise<UserRegistered>}
   */
  async execute(payload) {
    await this.#userRepository.isUsernameUnique(payload);
    const userPreRegister = new UserPreRegister(payload);
    userPreRegister.password = await this.#passwordHash.hash(payload);
    return new UserRegistered(await this.#userRepository.addUser(userPreRegister));
  }
};
