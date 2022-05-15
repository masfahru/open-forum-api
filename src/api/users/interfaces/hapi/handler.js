const AddUserUseCase = require('../../use_cases/addUserUseCase');
/**
 * @class
 * Class to handler request realted to users routes.
 */
module.exports = class UsersHandler {
  #container;

  /**
   * @constructor
   * @param {object} container - Dependency injection container.
   */
  constructor(container) {
    this.#container = container;
    this.postUsersHandler = this.postUsersHandler.bind(this);
  }

  /**
   * @method postUsersHandler
   * @async
   * @param {object} request - Hapi request object
   * @param {object} h - Hapi response object
   * @return {Promise<response>} Hapi response object
   */
  async postUsersHandler(request, h) {
    const addUserUseCase = this.#container.get(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }
};
