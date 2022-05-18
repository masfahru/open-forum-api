const UserRepository = require('./abstracts/userRepository');
const AuthenticationError = require('../../../utils/errors/authenticationError');

module.exports = class AuthUserRepositoryPostgre extends UserRepository {
  #dbService;

  /**
   * @constructor
   * @param {DbService} dbService
   */
  constructor(dbService) {
    super();
    this.#dbService = dbService;
  }

  async getPasswordByUsername({ username }) {
    const query = {
      text: 'SELECT password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this.#dbService.query(query);
    if (result.rowCount === 0) throw new AuthenticationError('Username tidak ditemukan');
    return result.rows[0];
  }
};
