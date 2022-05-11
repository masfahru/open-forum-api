/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

/**
 * Abstraction Repository for handling database users
 */

module.exports = class UserRepository {
  /**
   * @method addUser
   * @param {{userPreRegister: UserPreRegister}} user
   */
  async getPasswordByUsername({ username }) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * @method isUsernameUnique
   * @param {{username: string}}
   */
  async isUsernameUnique({ username }) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
};
