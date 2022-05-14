/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
class DbService {
  async query({ text, values }) {
    throw new Error('DB_SERVICE.METHOD_NOT_IMPLEMENTED');
  }
}
module.exports = DbService;
