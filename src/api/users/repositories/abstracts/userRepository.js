/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

/**
 * Abstraction Repository for handling database users
 */

module.exports = class UserRepository {
  /**
   * @method addUser
   * @param {UserPreRegister} userPreRegister
   */
  async addUser(userPreRegister) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * @method isUsernameUnique
   * @param {UserPreRegister} userPreRegister
   */
  async isUsernameUnique(userPreRegister) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * @method getPasswordByUsername
   * @param {UserPreRegister} userPreRegister
   */
  async getPasswordByUsername(userPreRegister) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
};
