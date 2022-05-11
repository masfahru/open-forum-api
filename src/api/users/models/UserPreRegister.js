/**
 * Model for User who will be registered
 * User must provide username and password
 */
module.exports = class UserPreRegister {
  /**
   * @constructor
   * @param {{username: string, password: string, fullname: string}}
   */
  constructor({ username, password, fullname }) {
    this.username = username;
    this.password = password;
    this.fullname = fullname;
    this.#isValid();
  }

  /**
   * Check if the username, password, and fullname is valid
   */
  #isValid() {
    // Username, password, and fullname must be provided
    if (!this.username || !this.password || !this.fullname) {
      throw new Error('USER_PRE_REGISTER.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    // Username, password, and fullname must be string
    if (typeof this.username !== 'string' || typeof this.password !== 'string' || typeof this.fullname !== 'string') {
      throw new Error('USER_PRE_REGISTER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
    // password must be at least 8 characters with at least 1 number, 1 uppercase
    // and 1 lowercase letter, and 1 special character
    const format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    //
    if (!format.test(this.password)) throw new Error('USER_PRE_REGISTER.PASSWORD_NOT_MEET_FORMAT');
  }
};
