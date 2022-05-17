const InvariantError = require('./invariantError');

module.exports = class DomainErrorTranslator {
  static directories = {
    'USER_PRE_REGISTER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
    'USER_PRE_REGISTER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
    'USER_PRE_REGISTER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
    'USER_PRE_REGISTER.FULLNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter fullname melebihi batas limit'),
    'USER_PRE_REGISTER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
    'USER_PRE_REGISTER.PASSWORD_NOT_MEET_FORMAT': new InvariantError('tidak dapat membuat user baru karena password tidak memenuhi kriteria keamanan'),
    'USER_REGISTERED.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('user properti yang dibutuhkan tidak ada'),
    'USER_REGISTERED.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tipe data properti user tidak sesuai'),
    'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
    'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),
    'USER_LOGIN.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat login user karena karakter username melebihi batas limit'),
    'USER_LOGIN.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat login user karena username mengandung karakter terlarang'),
    'USER_LOGIN.PASSWORD_NOT_MEET_FORMAT': new InvariantError('tidak dapat login user karena password tidak memenuhi kriteria keamanan'),
    'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
    'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
    'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
    'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  };

  static translate(error) {
    return DomainErrorTranslator.directories[error.message] || error;
  }
};
