/**
 * Model for Registered User
 */

module.exports = class UserRegistered {
  /**
   * @constructor
   * @param {{id: string, username: string, fullname: string}}
   */

  constructor({ id, username, fullname }) {
    this.constructor.isValid(id, username, fullname);
    this.id = id;
    this.username = username;
    this.fullname = fullname;
  }

  /**
   * Check if the id, username, and fullname is valid
   */
  static isValid(id, username, fullname) {
    if (!id || !username || !fullname) {
      throw new Error('USER_REGISTERED.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof fullname !== 'string') {
      throw new Error('USER_REGISTERED.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
};
