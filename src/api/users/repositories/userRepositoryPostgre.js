const InvariantError = require('../../../utils/errors/invariantError');
const UserRepository = require('./abstracts/userRepository');

module.exports = class UserRepositoryPostgre extends UserRepository {
  #dbService;

  #idGenerator;

  /**
   * @constructor
   * @param {DbService} dbService
   * @param {IdGenerator} idGenerator
   */
  constructor(dbService, idGenerator) {
    super();
    this.#dbService = dbService;
    this.#idGenerator = idGenerator;
  }

  /**
   * @method addUser
   * @async
   * @param {{username: string, password: string, fullname: string}} userPreRegister
   */
  async addUser({ username, password, fullname }) {
    const id = `user-${this.#idGenerator()}`;
    const query = {
      text: 'INSERT INTO users (id, username, password, fullname) VALUES ($1, $2, $3, $4) RETURNING id, username, fullname',
      values: [id, username, password, fullname],
    };
    const result = await this.#dbService.query(query);
    return result.rows[0];
  }

  /**
   * @method isUsernameUnique
   * @async
   * @param {{username: string}} userPreRegister
   * @returns {Promise<boolean>}
   */
  async isUsernameUnique({ username }) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this.#dbService.query(query);
    if (result.rows.length === 1) {
      throw new InvariantError('username tidak tersedia');
    }
    return true;
  }

  /**
   * @method getPasswordByUsername
   * @async
   * @param {{username: string}} userPreRegister
   * @returns {Promise<boolean>}
   */
  async getPasswordByUsername({ username }) {
    const query = {
      text: 'SELECT password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this.#dbService.query(query);
    if (result.rowCount === 0) throw new InvariantError('Username tidak ditemukan');
    return result.rows[0];
  }
};
