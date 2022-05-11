/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

/**
 * Abstraction for password Hash
 */
module.exports = class PasswordHash {
  /**
   * Hash the password
   * @param {{password: string}}
   */
  async hash({ password }) {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }
};
