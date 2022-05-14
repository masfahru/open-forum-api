const { Pool } = require('pg');
const DatabaseError = require('../../../utils/errors/databaseError');

module.exports = class DbServicePostgre {
  #pool;

  /**
   * @constructor
   * @param {DbConfig} dbConfig
   * having this parameter, we could create multiple instance of Db ServicePostgre
   * with different config
   */
  constructor(dbConfig) {
    this.#pool = new Pool(dbConfig);
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
