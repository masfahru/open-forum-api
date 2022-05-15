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
   * @param {}
   */
  async postUsersHandler(req, res, next) {
    try {
      const addUserUseCase = this.#container.get(AddUserUseCase.name);
      const addedUser = await addUserUseCase.execute(req.body);
      return res.status(201).json({
        status: 'success',
        data: {
          addedUser,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
};
