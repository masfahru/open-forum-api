const DatabaseError = require('../../../utils/errors/databaseError');

const databaseErrorHandler = (err, req, res, next) => {
  if (err instanceof DatabaseError) {
    // we could change this console log with anoter logging system
    console.log(err.message);
    return res.status(err.statusCode).json({
      status: 'Database Error',
      message: 'Our Engineer is working on it. Please try again later.',
    });
  }
  return next(err);
};
module.exports = databaseErrorHandler;
