const { UserPreRegister, UserRegistered } = require('../../models');
const UserRepository = require('../../repositories/abstracts/userRepository');
const PasswordHash = require('../../../../utils/security/abstracts/passwordHash');
const AddUserUseCase = require('../addUserUseCase');

/**
 * Testing for use case: Add user
 */
describe('AddUserUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    /**
     * Steps:
     * 1. Make sure the username is unique
     * 2. Hash the password
     * 3. Save the user
     * 4. Return the user
     */
    // Arrange
    const username = 'fahru';
    const password = 'Password123#';
    const fullname = 'Fahru Ibrahim';
    const id = 'user-123-456';

    const payload = {
      username,
      password,
      fullname,
    };

    const expectedPayload = {
      id,
      username,
      fullname,
    };

    const userPreRegister = new UserPreRegister(payload);
    const userRegistered = new UserRegistered(expectedPayload);
    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();

    // Mocking needed function
    mockUserRepository.isUsernameUnique = jest.fn().mockResolvedValue(true);
    mockPasswordHash.hash = jest.fn().mockResolvedValue('encrypted_password');
    // hashed password should be stored in the user pre register model
    userPreRegister.password = 'encrypted_password';
    mockUserRepository.addUser = jest.fn().mockResolvedValue(expectedPayload);

    // Create instance of use case
    const addUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });

    // Execute the use case
    const result = await addUserUseCase.execute(payload);

    // Assert the result
    expect(mockUserRepository.isUsernameUnique)
      .toHaveBeenCalledWith({ username });
    expect(mockPasswordHash.hash).toHaveBeenCalledWith({ password });
    expect(mockUserRepository.addUser).toHaveBeenCalledWith(userPreRegister);
    expect(result).toEqual(userRegistered);
  });
});
