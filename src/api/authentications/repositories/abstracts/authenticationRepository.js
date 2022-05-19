/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

/**
 * Abstraction Repository for handling database authentications
 */

module.exports = class AuthenticationsRepository {
  /**
   * @method addToken
   * @param {{token: string}} payload
   */
  async addToken({ token }) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * @method isTokenExist
   * @param {{token: string}} payload
   */
  async isTokenExist({ token }) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * @method deleteToken
   * @param {{token: string}} payload
   */
  async deleteToken({ token }) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
};
