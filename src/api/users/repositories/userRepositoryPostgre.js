const InvariantError = require('../../../utils/errors/invariantError');

module.exports = class UserRepositoryPostgre {
  #db;

  /**
   * @method constructor
   * @param {DbService} dbService
   */
  constructor(dbService) {
    this.#db = dbService;
  }

  /**
   * @method isUsernameUnique
   * @async
   * @param {{username: string}} userPreRegister
   */
  async isUsernameUnique({ username }) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this.#db.query(query);
    if (result.rows.length > 0) {
      throw new InvariantError('Username telah digunakan');
    }
  }

  /**
   * @method addUser
   * @async
   * @param {{username: string, password: string, fullname: string}} userPreRegister
   */
  async addUser({ username, password, fullname }) {
    const query = {
      text: 'INSERT INTO users (username, password, fullname) VALUES ($1, $2, $3) RETURNING id, username, fullname',
      values: [username, password, fullname],
    };
    const result = await this.#db.query(query);
    if (result.rows.length === 0) {
      throw new InvariantError('Gagal menambahkan user');
    }
    return result.rows[0];
  }
};
