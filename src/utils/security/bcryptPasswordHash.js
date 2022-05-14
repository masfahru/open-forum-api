const EncryptionHelper = require('./abstracts/passwordHash');
const AuthenticationError = require('../errors/authenticationError');

class BcryptPasswordHash extends EncryptionHelper {
  #bcrypt;

  #saltRound;

  constructor(bcrypt, saltRound = 10) {
    super();
    this.#bcrypt = bcrypt;
    this.#saltRound = saltRound;
  }

  /**
   * Hash password
   * @param {{password: string}} payload
   * @returns {Promise<string>}
   */
  async hash({ password }) {
    return this.#bcrypt.hash(password, this.#saltRound);
  }

  /**
   * Compare Password
   * @param {{password: string, hashedPassword: string}} payload
   * @returns {Promise<boolean>}
   * @throws {AuthenticationError}
   */
  async comparePassword({ password, hashedPassword }) {
    const result = await this.#bcrypt.compare(password, hashedPassword);

    if (!result) {
      throw new AuthenticationError('kredensial yang Anda masukkan salah');
    }
  }
}

module.exports = BcryptPasswordHash;
