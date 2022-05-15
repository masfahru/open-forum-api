const InvariantError = require('../../../utils/errors/invariantError');
const UserRepository = require('./abstracts/userRepository');

module.exports = class UserRepositoryPostgre extends UserRepository {
  #db;

  #idGenerator;

  /**
   * @constructor
   * @param {DbService} dbService
   * @param {IdGenerator} idGenerator
   */
  constructor(dbService, idGenerator) {
    super();
    this.#db = dbService;
    this.#idGenerator = idGenerator;
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
      throw new InvariantError('username tidak tersedia');
    }
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
    const result = await this.#db.query(query);
    if (result.rows.length === 0) {
      throw new InvariantError('Gagal menambahkan user');
    }
    return result.rows[0];
  }
};
