const EncryptionHelper = require('../passwordHash');

describe('EncryptionHelper interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const encryptionHelper = new EncryptionHelper();
    const password = 'dummy_password';
    const hashedPassword = 'hashedPassword';

    // Action & Assert
    await expect(encryptionHelper.hash({ password })).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
    await expect(encryptionHelper.comparePassword({ password, hashedPassword })).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
});
