const DbService = require('../dbService');

describe('DB Service interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const userRepository = new DbService();

    // Action and Assert
    await expect(userRepository.query({})).rejects.toThrowError('DB_SERVICE.METHOD_NOT_IMPLEMENTED');
  });
});
