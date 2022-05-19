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
   * @param {object} request - Hapi request object
   * @param {object} h - Hapi response object
   * @return {Promise<response>} Hapi response object
   */
  async postAuthenticationHandler(request, h) {
    const loginUserUseCase = this.#container.getInstance(LoginUserUseCase.name);
    const { accessToken, refreshToken } = await loginUserUseCase.execute(request.payload);
    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  /**
   * @method putAuthenticationHandler
   * @async
   * @param {object} request - Hapi request object
   * @return {Promise<response>} Hapi response object
   */
  async putAuthenticationHandler(request) {
    const refreshAuthenticationUseCase = this.#container
      .getInstance(RefreshTokenUseCase.name);
    const accessToken = await refreshAuthenticationUseCase.execute(request.payload);

    return {
      status: 'success',
      data: {
        accessToken,
      },
    };
  }

  /**
   * @method deleteAuthenticationHandler
   * @async
   * @param {object} request - Hapi request object
   * @param {object} h - Hapi response object
   * @return {Promise<response>} Hapi response object
   */
  async deleteAuthenticationHandler(request) {
    const logoutUserUseCase = this.#container.getInstance(LogoutUserUseCase.name);
    await logoutUserUseCase.execute(request.payload);
    return {
      status: 'success',
    };
  }
};
