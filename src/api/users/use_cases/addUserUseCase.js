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
   * @param {UserRepository} userRepository
   * @param {PasswordHash} passwordHash
   */
  constructor(userRepository, passwordHash) {
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
    const userPreRegister = new UserPreRegister(payload);
    await this.#userRepository.isUsernameUnique(userPreRegister);
    userPreRegister.password = await this.#passwordHash.hash(userPreRegister);
    return new UserRegistered(await this.#userRepository.addUser(userPreRegister));
  }
};
