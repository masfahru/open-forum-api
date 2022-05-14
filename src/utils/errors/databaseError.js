module.exports = class DatabaseError extends Error {
  constructor(message, statusCode = 500) {
    super(message);

    this.statusCode = statusCode;
    this.name = 'DatabaseError';
  }
};
