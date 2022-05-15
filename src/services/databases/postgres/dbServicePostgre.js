const DatabaseError = require('../../../utils/errors/databaseError');

module.exports = class DbServicePostgre {
  #pool;

  /**
   * @constructor
   * @param {Pool} Pool
   * having this parameter, we could create multiple instance of Db ServicePostgre
   * with different config
   */
  constructor(pool) {
    this.#pool = pool;
  }

  async query({ text, values }) {
    try {
      const res = await this.#pool.query(text, values);
      return (({ rowCount, rows }) => ({ rowCount, rows }))(res);
    } catch (error) {
      throw new DatabaseError(error.message);
    }
  }

  async end() {
    await this.#pool.end();
  }
};
