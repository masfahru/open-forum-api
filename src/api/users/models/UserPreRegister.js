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
    this.constructor.isValid(username, password, fullname);
    this.username = username;
    this.password = password;
    this.fullname = fullname;
  }

  /**
   * Check if the username, password, and fullname is valid
   */
  static isValid(username, password, fullname) {
    if (!username || !password || !fullname) {
      throw new Error('USER_PRE_REGISTER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof password !== 'string' || typeof fullname !== 'string') {
      throw new Error('USER_PRE_REGISTER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (username.length > 50) {
      throw new Error('USER_PRE_REGISTER.USERNAME_LIMIT_CHAR');
    }

    if (fullname.length > 50) {
      throw new Error('USER_PRE_REGISTER.FULLNAME_LIMIT_CHAR');
    }

    const usernameFormat = /^[\w]+$/;
    if (!usernameFormat.test(username)) {
      throw new Error('USER_PRE_REGISTER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }

    // password should be at least 8 characters long,
    // and contain at least one number, one lowercase and one uppercase letter
    const formatStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !@#$%^&*])(?=.{8,})/;
    if (!formatStrongPassword.test(password)) {
      throw new Error('USER_PRE_REGISTER.PASSWORD_NOT_MEET_FORMAT');
    }
  }
};
