const AuthenticationRepository = require('./abstracts/authenticationRepository');
const InvariantError = require('../../../utils/errors/invariantError');

module.exports = class AuthRepositoryPostgre extends AuthenticationRepository {
  #dbService;

  constructor(dbService) {
    super();
    this.#dbService = dbService;
  }

  /**
   * @method addToken
   * @param {{token: string}} payload
   * @return {Promise<boolean>}
   */
  async addToken({ token }) {
    AuthRepositoryPostgre.validateToken(token);
    const query = {
      text: 'INSERT INTO tokens (token) VALUES ($1)',
      values: [token],
    };
    const result = await this.#dbService.query(query);
    return result.rowCount === 1;
  }

  /**
   * @method isTokenExist
   * @param {{token: string}} payload
   * @return {Promise<boolean>}
   */
  async isTokenExist({ token }) {
    AuthRepositoryPostgre.validateToken(token);
    const query = {
      text: 'SELECT token FROM tokens WHERE token = $1',
      values: [token],
    };
    const result = await this.#dbService.query(query);
    if (result.rowCount === 0) {
      throw new InvariantError('refresh token tidak ditemukan di database');
    }

    return result.rowCount === 1;
  }

  /**
   * @method deleteToken
   * @param {{token: string}} payload
   * @return {Promise<void>}
   */
  async deleteToken({ token }) {
    AuthRepositoryPostgre.validateToken(token);
    const query = {
      text: 'DELETE FROM tokens WHERE token = $1',
      values: [token],
    };
    const result = await this.#dbService.query(query);
    return result.rowCount === 1;
  }

  /**
   * @static
   * @method validateToken
   * @param {string} token
   */
  static validateToken(token) {
    if (!token) {
      throw new Error('Token is undefined');
    }
    if (typeof token !== 'string') {
      throw new Error(`Token must be string, currenty type is ${typeof token}`);
    }
  }
};
