/**
 * Model for login user
 * User must provide username and password
 */
module.exports = class UserLogin {
  /**
   * @constructor
   * @param {{username: string, password: string}}
   */
  constructor({ username, password }) {
    this.username = username;
    this.password = password;
    this.#isValid();
  }

  /**
   * Check if the username and password is valid
   */
  #isValid() {
    if (!this.username || !this.password) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof this.username !== 'string' || typeof this.password !== 'string') {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
    if (this.username.length > 50) throw new Error('USER_LOGIN.USERNAME_LIMIT_CHAR');

    if (!this.username.match(/^[\w]+$/)) throw new Error('USER_LOGIN.USERNAME_CONTAIN_RESTRICTED_CHARACTER');

    const format = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!format.test(this.password)) throw new Error('USER_LOGIN.PASSWORD_NOT_MEET_FORMAT');
  }
};
