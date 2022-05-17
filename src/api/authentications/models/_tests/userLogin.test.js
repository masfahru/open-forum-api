const UserLogin = require('../userLogin');

describe('UserLogin entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    const payload = {
      username: 'fahru',
    };

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      username: 'fahru',
      password: true,
    };

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when username is too long', () => {
    const payload = {
      username: 'fahrugantengsholehrajinbelajardanbekerjasukamenabungsayangkeluarga',
      password: 'asdasd',
    };

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.USERNAME_LIMIT_CHAR');
  });

  it('should throw error when username contains forbidden character', () => {
    const payload = {
      username: 'fahru dicoding',
      password: 'asdasd',
    };

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should throw error when password doesn\'t meet specification', () => {
    const payload = {
      username: 'fahru',
      password: 'asdasd',
    };

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.PASSWORD_NOT_MEET_FORMAT');
  });

  it('should create UserLogin entities correctly', () => {
    const payload = {
      username: 'fahru',
      password: 'StrongP4ssw0rd$',
      fullname: 'Dicoding Indonesia',
    };

    const userLogin = new UserLogin(payload);

    expect(userLogin).toBeInstanceOf(UserLogin);
    expect(userLogin.username).toEqual(payload.username);
    expect(userLogin.password).toEqual(payload.password);
  });
});
