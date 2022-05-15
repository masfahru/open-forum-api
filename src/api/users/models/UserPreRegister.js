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
    if (!this.username || !this.password || !this.fullname) {
      throw new Error('USER_PRE_REGISTER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof this.username !== 'string' || typeof this.password !== 'string' || typeof this.fullname !== 'string') {
      throw new Error('USER_PRE_REGISTER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (this.username.length > 50) {
      throw new Error('USER_PRE_REGISTER.USERNAME_LIMIT_CHAR');
    }

    if (this.fullname.length > 50) {
      throw new Error('USER_PRE_REGISTER.FULLNAME_LIMIT_CHAR');
    }

    if (!this.username.match(/^[\w]+$/)) {
      throw new Error('USER_PRE_REGISTER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }

    const format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    //
    if (!format.test(this.password)) throw new Error('USER_PRE_REGISTER.PASSWORD_NOT_MEET_FORMAT');
  }
};
