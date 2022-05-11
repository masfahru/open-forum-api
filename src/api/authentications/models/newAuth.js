/**
 * Module for creating a new authentication
 */
module.exports = class NewAuth {
  constructor(payload) {
    this.accessToken = payload.accessToken;
    this.refreshToken = payload.refreshToken;
    this.#isValid();
  }

  /**
   * Check if the accessToken and refreshToken is valid
   */
  #isValid() {
    if (!this.accessToken || !this.refreshToken) {
      throw new Error('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof this.accessToken !== 'string' || typeof this.refreshToken !== 'string') {
      throw new Error('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
};
