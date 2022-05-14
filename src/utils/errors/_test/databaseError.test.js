const DatabaseError = require('../databaseError');
/**
 * Unit Testing for database error
 */
describe('DatabaseError', () => {
  it('should throw error when directly use it', () => {
    const databaseError = new DatabaseError('There is some error when connecting to database!');

    expect(databaseError).toBeInstanceOf(DatabaseError);
    expect(databaseError).toBeInstanceOf(Error);

    expect(databaseError.statusCode).toEqual(500);
    expect(databaseError.message).toEqual('There is some error when connecting to database!');
    expect(databaseError.name).toEqual('DatabaseError');
  });
});
