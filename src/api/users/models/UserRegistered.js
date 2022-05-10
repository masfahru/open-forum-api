/**
 * Model for Registered User
 */

module.exports = class UserRegistered {
  /**
   * @constructor
   * @param {{id: string, username: string, fullname: string}}
   */

  constructor({ id, username, fullname }) {
    this.id = id;
    this.username = username;
    this.fullname = fullname;
    this.#isValid();
  }

  /**
   * Check if the id, username, and fullname is valid
   * @throws {Error}
   * @returns {void}
   * @private
   */

  #isValid() {
    // Id, username, and fullname must be provided
    if (!this.id || !this.username || !this.fullname) {
      throw new Error('USER_REGISTERED.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    // Id, username, and fullname must be string
    if (typeof this.id !== 'string' || typeof this.username !== 'string' || typeof this.fullname !== 'string') {
      throw new Error('USER_REGISTERED.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
};
