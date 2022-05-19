const LoginUserUseCase = require('../../use_cases/loginUserUseCase');
const LogoutUserUseCase = require('../../use_cases/logoutUserUseCase');
const RefreshTokenUseCase = require('../../use_cases/refreshAccessTokenUseCase');

/**
 * @class
 * Class to handler request realted to authentication routes.
 */
module.exports = class AuthenticationsHander {
  #container;

  /**
   * @constructor
   * @param {object} container - Dependency injection container.
   */
  constructor(container) {
    this.#container = container;
    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  /**
   * @method postAuthenticationHandler
   * @async
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {function} next - Express next middleware function.
   * @returns {object} - Express response object.
   */
  async postAuthenticationHandler(req, res, next) {
    try {
      const loginUserUseCase = this.#container.getInstance(LoginUserUseCase.name);
      const { accessToken, refreshToken } = await loginUserUseCase.execute(req.body);
      return res.status(201).json({
        status: 'success',
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @method putAuthenticationHandler
   * @async
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {function} next - Express next middleware function.
   * @returns {object} - Express response object.
   */
  async putAuthenticationHandler(req, res, next) {
    try {
      const refreshAuthenticationUseCase = this.#container
        .getInstance(RefreshTokenUseCase.name);
      const accessToken = await refreshAuthenticationUseCase.execute(req.body);
      return res.json({
        status: 'success',
        data: {
          accessToken,
        },
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @method deleteAuthenticationHandler
   * @async
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {function} next - Express next middleware function.
   * @returns {object} - Express response object.
   */
  async deleteAuthenticationHandler(req, res, next) {
    try {
      const logoutUserUseCase = this.#container.getInstance(LogoutUserUseCase.name);
      await logoutUserUseCase.execute(req.body);
      return res.json({
        status: 'success',
      });
    } catch (err) {
      return next(err);
    }
  }
};
