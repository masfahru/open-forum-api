const UserPreRegister = require('../UserPreRegister');

describe('UserPreRegister entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    const payload = {
      username: 'dicoding',
      password: 'asdasd123',
    };

    expect(() => new UserPreRegister(payload)).toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      username: 'dicoding',
      password: true,
      fullname: 'Dicoding Indonesia',
    };

    expect(() => new UserPreRegister(payload)).toThrowError('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when password doesn\'t meet specification', () => {
    const payload = {
      username: 'dicoding',
      password: 'asdasd',
      fullname: 'Dicoding Indonesia',
    };

    expect(() => new UserPreRegister(payload)).toThrowError('USER_LOGIN.PASSWORD_NOT_MEET_FORMAT');
  });

  it('should create UserLogin entities correctly', () => {
    const payload = {
      username: 'true',
      password: 'asdAsd14$',
      fullname: 'Dicoding Indonesia',
    };

    const userPreRegister = new UserPreRegister(payload);

    expect(userPreRegister).toBeInstanceOf(UserPreRegister);
    expect(userPreRegister.username).toEqual(payload.username);
    expect(userPreRegister.password).toEqual(payload.password);
    expect(userPreRegister.fullname).toEqual(payload.fullname);
  });
});
