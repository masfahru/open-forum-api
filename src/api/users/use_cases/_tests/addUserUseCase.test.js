const { UserPreRegister, UserRegistered } = require('../../models');
const UserRepository = require('../../repositories/abstracts/userRepository');
const PasswordHash = require('../../../../utils/abstracts/passwordHash');
const AddUserUseCase = require('../addUserUseCase');

/**
 * Testing for use case: Add user
 */
describe('AddUserUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    const payload = {
      username: 'fahru',
      password: 'Password123#',
      fullname: 'Dicoding Indonesia',
    };

    const expectedPayload = {
      id: 'user-123-456',
      username: 'fahru',
      fullname: 'Dicoding Indonesia',
    };

    // Create User Pre Register Model
    const userPreRegister = new UserPreRegister(payload);

    // Expect the result to be an object of User Registered Model
    const userRegistered = new UserRegistered(expectedPayload);

    // Mocking dependency of use case
    const mockUserRepository = new UserRepository();
    const mockPasswordHash = new PasswordHash();

    // Mocking needed function
    // Check if username is unique
    mockUserRepository.isUsernameUnique = jest.fn().mockResolvedValue(true);

    // Hash the password
    mockPasswordHash.hash = jest.fn().mockResolvedValue('encrypted_password');
    // hashed password should be stored in the user pre register model
    userPreRegister.password = 'encrypted_password';

    // Save the user to database
    mockUserRepository.addUser = jest.fn().mockResolvedValue(userRegistered);

    // Create a instance of AddUserUseCase
    const addUserUseCase = new AddUserUseCase({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });

    // Execute the use case
    const result = await addUserUseCase.execute(payload);

    // Assert the result
    expect(mockUserRepository.isUsernameUnique).toHaveBeenCalledWith(payload);
    expect(mockPasswordHash.hash).toHaveBeenCalledWith(payload);
    expect(mockUserRepository.addUser).toHaveBeenCalledWith(userPreRegister);
    expect(result).toEqual(userRegistered);
  });
});
