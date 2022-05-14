const bcrypt = require('bcrypt');
const AuthenticationError = require('../../errors/authenticationError');
const BcryptEncryptionHelper = require('../bcryptPasswordHash');

describe('BcryptEncryptionHelper', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      // Arrange
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bcryptEncryptionHelper = new BcryptEncryptionHelper(bcrypt);

      // Action
      const encryptedPassword = await bcryptEncryptionHelper.hash({ password: 'plain_password' });

      // Assert
      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual('plain_password');
      expect(spyHash).toBeCalledWith('plain_password', 10); // 10 adalah nilai saltRound default untuk BcryptEncryptionHelper
    });
  });

  describe('comparePassword function', () => {
    it('should throw AuthenticationError if password not match', async () => {
      // Arrange
      const bcryptEncryptionHelper = new BcryptEncryptionHelper(bcrypt);
      const password = 'plain_password';
      const hashedPassword = 'encrypted_password';
      // Act & Assert
      await expect(bcryptEncryptionHelper.comparePassword({ password, hashedPassword }))
        .rejects
        .toThrow(AuthenticationError);
    });

    it('should not return AuthenticationError if password match', async () => {
      // Arrange
      const bcryptEncryptionHelper = new BcryptEncryptionHelper(bcrypt);
      const password = 'secret';
      const hashedPassword = await bcryptEncryptionHelper.hash({ password });

      // Act & Assert
      await expect(bcryptEncryptionHelper.comparePassword({ password, hashedPassword }))
        .resolves.not.toThrow(AuthenticationError);
    });
  });
});
